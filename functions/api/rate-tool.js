/**
 * Cloudflare Worker for Tool Rating System
 * 
 * Handles POST requests to /api/rate-tool for collecting and storing tool ratings
 * in a D1 database with atomic UPSERT operations.
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // CORS headers for cross-origin requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON body',
          details: 'Request body must be valid JSON'
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Validate required fields
    const { toolSlug, rating } = body;
    
    if (!toolSlug || typeof toolSlug !== 'string') {
      return new Response(
        JSON.stringify({ 
          error: 'Missing or invalid toolSlug',
          details: 'toolSlug must be a non-empty string'
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid rating',
          details: 'rating must be an integer between 1 and 5'
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Validate toolSlug format (alphanumeric and hyphens only for security)
    if (!/^[a-z0-9-]+$/.test(toolSlug)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid toolSlug format',
          details: 'toolSlug must contain only lowercase letters, numbers, and hyphens'
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Check if D1 database is available
    if (!env.DB) {
      console.error('D1 database binding not found');
      return new Response(
        JSON.stringify({ 
          error: 'Database unavailable',
          details: 'Internal server configuration error'
        }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Perform UPSERT operation using prepared statement
    try {
      // First, try to get existing record
      const existingRecord = await env.DB.prepare(
        'SELECT totalRatings, sumOfRatings FROM ratings WHERE toolSlug = ?'
      ).bind(toolSlug).first();

      let result;
      if (existingRecord) {
        // Record exists - update it atomically
        const newTotalRatings = existingRecord.totalRatings + 1;
        const newSumOfRatings = existingRecord.sumOfRatings + rating;
        
        result = await env.DB.prepare(
          'UPDATE ratings SET totalRatings = ?, sumOfRatings = ? WHERE toolSlug = ?'
        ).bind(newTotalRatings, newSumOfRatings, toolSlug).run();
        
        if (!result.success) {
          throw new Error('Failed to update existing rating record');
        }
      } else {
        // No record exists - insert new one
        result = await env.DB.prepare(
          'INSERT INTO ratings (toolSlug, totalRatings, sumOfRatings) VALUES (?, ?, ?)'
        ).bind(toolSlug, 1, rating).run();
        
        if (!result.success) {
          throw new Error('Failed to insert new rating record');
        }
      }

      // Get updated statistics for response
      const updatedRecord = await env.DB.prepare(
        'SELECT totalRatings, sumOfRatings FROM ratings WHERE toolSlug = ?'
      ).bind(toolSlug).first();

      if (!updatedRecord) {
        throw new Error('Failed to retrieve updated rating statistics');
      }

      const averageRating = updatedRecord.sumOfRatings / updatedRecord.totalRatings;

      // Return success response with updated statistics
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Rating submitted successfully',
          data: {
            toolSlug: toolSlug,
            submittedRating: rating,
            totalRatings: updatedRecord.totalRatings,
            averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
            sumOfRatings: updatedRecord.sumOfRatings
          }
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );

    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return new Response(
        JSON.stringify({ 
          error: 'Database operation failed',
          details: 'Failed to save rating. Please try again later.'
        }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

  } catch (error) {
    console.error('Unexpected error in rate-tool worker:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: 'An unexpected error occurred'
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}