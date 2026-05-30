"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

import { MarketplaceProvider } from "@/components/providers/marketplace-provider";

type AppProvidersProps = {
    children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 30_000,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <MarketplaceProvider>
                {children}
                <Toaster richColors position="top-right" theme="dark" closeButton />
            </MarketplaceProvider>
        </QueryClientProvider>
    );
}