/**
 * Cloudflare Worker for PDF Metadata Editor
 * Handles server-side PDF metadata processing
 */

export default {
  async fetch(request, env, ctx) {
    // Enable CORS for all requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200, 
        headers: corsHeaders 
      });
    }

    try {
      if (request.method === 'POST') {
        const formData = await request.formData();
        const file = formData.get('file');
        
        if (!file) {
          return new Response(JSON.stringify({ 
            error: 'No file provided' 
          }), { 
            status: 400,
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders 
            }
          });
        }

        // For now, return a mock response
        // In production, this would use pdf-lib or similar to process the PDF
        const mockMetadata = {
          title: 'Sample Document',
          author: 'Unknown Author',
          subject: '',
          keywords: '',
          creator: 'Sample Creator',
          producer: 'Sample Producer',
          creationDate: new Date().toISOString(),
          modificationDate: new Date().toISOString(),
          fileSize: file.size,
          pages: 1
        };

        return new Response(JSON.stringify({
          success: true,
          metadata: mockMetadata,
          message: 'PDF metadata extracted successfully'
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          }
        });
      }

      // Handle unsupported methods
      return new Response(JSON.stringify({ 
        error: 'Method not allowed' 
      }), { 
        status: 405,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });

    } catch (error) {
      console.error('Worker error:', error);
      
      return new Response(JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }), { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });
    }
  }
};