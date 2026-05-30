"use client";

import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/components/providers/marketplace-provider";
import { truncateWallet } from "@/lib/format";

export function SettingsView() {
    const { isConnected, openWalletOnboarding, walletAddress, walletBalance } = useMarketplace();

    return (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="surface-panel p-5">
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Mock wallet state</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Onboarding and permissions</h1>
                <div className="mt-6 space-y-4 text-sm text-slate-300">
                    <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
                        <p className="text-slate-500">Connection</p>
                        <p className="mt-2 text-lg font-semibold text-white">{isConnected ? "Connected" : "Disconnected"}</p>
                    </div>
                    <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
                        <p className="text-slate-500">Address</p>
                        <p className="mt-2 text-lg font-semibold text-white">{isConnected ? truncateWallet(walletAddress) : "Not connected"}</p>
                    </div>
                    <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
                        <p className="text-slate-500">Mock USDC balance</p>
                        <p className="mt-2 text-lg font-semibold text-white">{walletBalance.toLocaleString()} USDC</p>
                    </div>
                    {!isConnected ? (
                        <Button onClick={openWalletOnboarding} className="h-11 rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                            Open onboarding flow
                        </Button>
                    ) : null}
                </div>
            </section>

            <section className="surface-panel p-5">
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Readiness checklist</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Prototype guardrails and next integration layer</h2>
                <div className="mt-6 grid gap-4">
                    {[
                        "Wallet onboarding is now prototype-complete but still mocked. Replace the state owner, not the route flow, when a real provider is added.",
                        "Copy configuration and dashboard relationships are now connected through provider state and can later move to persisted APIs.",
                        "Trade execution, mirrored order routing, permissions, and historical persistence belong to later backend phases.",
                        "All pages should continue preserving loading, empty, error, and disconnected states while API layers remain mocked.",
                    ].map((line) => (
                        <div key={line} className="rounded-3xl border border-white/8 bg-white/4 p-4 text-sm leading-7 text-slate-300">
                            {line}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}