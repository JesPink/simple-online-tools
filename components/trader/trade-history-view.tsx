"use client";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { useMarketplace } from "@/components/providers/marketplace-provider";
import { formatCompactCurrency } from "@/lib/format";
import { useAllTrades } from "@/hooks/use-marketplace-data";

export function TradeHistoryView() {
    const { data, isError, isLoading } = useAllTrades();
    const { activeTraderIds, isConnected } = useMarketplace();

    if (!isConnected) {
        return (
            <EmptyState
                eyebrow="Connect wallet"
                title="Trade history becomes actionable after onboarding."
                description="The showcase keeps this route visible, but follower-specific execution context appears once the mocked wallet is connected and a trader is being copied."
                actionHref="/"
                actionLabel="Open leaderboard"
            />
        );
    }

    if (isError) {
        return <ErrorState title="Trade history is unavailable." description="The mock activity feed failed to load for this route." />;
    }

    if (isLoading || !data) {
        return <LoadingSkeleton rows={8} />;
    }

    const filteredTrades = activeTraderIds.length > 0 ? data.filter((trade) => activeTraderIds.includes(trade.traderId)) : [];

    if (filteredTrades.length === 0) {
        return (
            <EmptyState
                eyebrow="No copied trades"
                title="Start copying a trader to populate this execution log."
                description="Once a copy relationship is saved, the route highlights followed-trader activity instead of the broad market tape."
                actionHref="/"
                actionLabel="Find traders"
            />
        );
    }

    return (
        <section className="surface-panel p-5">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Market activity</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Cross-trader trade history</h1>
                </div>
                <span className="pill-chip">Follower-visible mock log</span>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/8">
                <table className="min-w-full divide-y divide-white/8 text-left text-sm">
                    <thead className="bg-white/4 text-slate-400">
                        <tr>
                            {["Trader", "Market", "Side", "Status", "Entry", "Exit", "P&L"].map((label) => (
                                <th key={label} className="px-4 py-4 font-medium">{label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/6">
                        {filteredTrades.slice(0, 20).map((trade) => (
                            <tr key={trade.id} className="hover:bg-white/4">
                                <td className="px-4 py-4 text-white">{trade.traderName}</td>
                                <td className="px-4 py-4 text-slate-200">{trade.market}</td>
                                <td className="px-4 py-4">
                                    <span className={trade.side === "YES" ? "text-emerald-200" : "text-rose-200"}>{trade.side}</span>
                                </td>
                                <td className="px-4 py-4 text-slate-400">{trade.status}</td>
                                <td className="px-4 py-4 text-slate-200">{trade.entryPrice.toFixed(2)}</td>
                                <td className="px-4 py-4 text-slate-200">{trade.exitPrice.toFixed(2)}</td>
                                <td className="px-4 py-4 text-emerald-200">{formatCompactCurrency(trade.pnl)} USDC</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}