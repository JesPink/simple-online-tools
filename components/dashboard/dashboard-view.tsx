"use client";

import Link from "next/link";
import { Pin } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { StatCard } from "@/components/common/stat-card";
import { TraderAvatar } from "@/components/common/trader-avatar";
import { useMarketplace } from "@/components/providers/marketplace-provider";
import { formatCompactCurrency } from "@/lib/format";
import { traderRoute } from "@/lib/navigation";

export function DashboardView() {
    const { dashboard, isConnected, openCopyConfigurator, stopCopying } = useMarketplace();
    const data = dashboard;

    if (!isConnected) {
        return (
            <EmptyState
                eyebrow="Wallet required"
                title="Connect your wallet before opening the follower dashboard."
                description="Leaderboard and trader profiles remain visible in browse mode. Once connected, this dashboard becomes the monitoring hub for active copy relationships."
                actionHref="/"
                actionLabel="Open leaderboard"
            />
        );
    }

    if (!data) {
        return <LoadingSkeleton rows={6} />;
    }

    if (data.activeTraders.length === 0) {
        return (
            <EmptyState
                eyebrow="No active copy relationships"
                title="You aren't copying any traders yet."
                description="Discover traders on the leaderboard, connect the mocked wallet, and save a copy configuration to populate this dashboard in real time."
                actionHref="/"
                actionLabel="Discover traders"
            />
        );
    }

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Total Invested" value={`${formatCompactCurrency(data.totalInvested)} USDC`} helper="Capital currently allocated across copied traders." />
                <StatCard title="Realised P&L" value={`${formatCompactCurrency(data.realizedPnl)} USDC`} helper="Closed performance across followed traders." change="+8.4%" trend="up" />
                <StatCard title="Unrealised P&L" value={`${formatCompactCurrency(data.unrealizedPnl)} USDC`} helper="Open copy performance based on current marks." change="+2.1%" trend="up" />
                <StatCard title="Active Traders" value={String(data.activeTraders.length)} helper="Live relationships with mock copy settings ready for future modal editing." />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
                <div className="surface-panel p-5">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Active copied traders</p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Portfolio overview</h2>
                        </div>
                        <span className="pill-chip">Mock aggregation</span>
                    </div>

                    <div className="mt-5 space-y-3">
                        {data.activeTraders.map((entry) => (
                            <div key={entry.trader.id} className="rounded-3xl border border-white/8 bg-white/4 p-4">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <Link href={traderRoute(entry.trader.id)} className="flex items-center gap-3">
                                        <TraderAvatar name={entry.trader.name} />
                                        <div>
                                            <p className="font-semibold text-white">{entry.trader.name}</p>
                                            <p className="text-xs text-slate-500">{entry.trader.strategy}</p>
                                        </div>
                                    </Link>

                                    <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-4 lg:min-w-[34rem]">
                                        <div>
                                            <p className="text-slate-500">Allocated</p>
                                            <p className="mt-1 font-medium text-white">{formatCompactCurrency(entry.allocatedCapital)} USDC</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500">Copied positions</p>
                                            <p className="mt-1 font-medium text-white">{entry.positionCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500">Realised</p>
                                            <p className="mt-1 font-medium text-emerald-200">{formatCompactCurrency(entry.realizedPnl)} USDC</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500">Unrealised</p>
                                            <p className="mt-1 font-medium text-cyan-100">{formatCompactCurrency(entry.unrealizedPnl)} USDC</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button type="button" onClick={() => openCopyConfigurator(entry.trader.id, "dashboard")} className="rounded-full border border-cyan-300/20 bg-cyan-400/14 px-4 py-2 text-xs font-semibold text-cyan-100">
                                        Adjust Copy
                                    </button>
                                    <button type="button" onClick={() => stopCopying(entry.trader.id)} className="rounded-full border border-rose-300/20 bg-rose-400/12 px-4 py-2 text-xs font-semibold text-rose-100">
                                        Stop Copying
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="surface-panel p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Live feed</p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Recent copied trades</h2>
                        </div>
                        <button type="button" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/6">
                            <Pin className="size-4" />
                        </button>
                    </div>

                    <div className="mt-5 space-y-3">
                        {data.liveFeed.map((trade) => (
                            <div key={trade.id} className="rounded-3xl border border-white/8 bg-white/4 p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-white">{trade.market}</p>
                                        <p className="mt-1 text-xs text-slate-500">{trade.traderName}</p>
                                    </div>
                                    <span
                                        className={[
                                            "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
                                            trade.side === "YES" ? "bg-emerald-400/16 text-emerald-200" : "bg-rose-400/16 text-rose-200",
                                        ].join(" ")}
                                    >
                                        {trade.side}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                                    <span>{trade.entryPrice.toFixed(2)} entry</span>
                                    <span>{trade.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}