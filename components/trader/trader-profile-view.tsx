"use client";

import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { StatCard } from "@/components/common/stat-card";
import { TraderAvatar } from "@/components/common/trader-avatar";
import { useMarketplace } from "@/components/providers/marketplace-provider";
import { formatCompactCurrency, formatPercent, truncateWallet } from "@/lib/format";
import { useTraderProfile } from "@/hooks/use-marketplace-data";

type TraderProfileViewProps = {
    traderId: string;
};

export function TraderProfileView({ traderId }: TraderProfileViewProps) {
    const { data, isError, isLoading } = useTraderProfile(traderId);
    const { activeTraderIds, openCopyConfigurator } = useMarketplace();

    if (isError) {
        return <ErrorState title="Trader profile failed to load." description="The mock trader profile query returned an error for this route." />;
    }

    if (isLoading) {
        return <LoadingSkeleton rows={8} />;
    }

    if (!data) {
        return (
            <EmptyState
                eyebrow="Trader missing"
                title="This mocked profile is unavailable."
                description="Add the trader seed back to lib/mock-data.ts or check the route parameter."
                actionHref="/"
                actionLabel="Return to leaderboard"
            />
        );
    }

    return (
        <div className="space-y-6">
            <section className="surface-panel-strong p-6 md:p-8">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex items-start gap-4">
                        <TraderAvatar name={data.trader.name} size="lg" />
                        <div>
                            <span className="pill-chip">Trader profile</span>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">{data.trader.name}</h1>
                            <p className="mt-2 text-sm text-slate-400">{truncateWallet(data.trader.walletAddress)} • {data.trader.strategy}</p>
                        </div>
                    </div>

                    <div className="grid w-full gap-2 sm:flex sm:w-auto sm:flex-wrap">
                        <button
                            type="button"
                            onClick={() => openCopyConfigurator(traderId, "profile")}
                            className="rounded-full border border-cyan-300/20 bg-cyan-400/14 px-5 py-3 text-sm font-semibold text-cyan-100 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/4 disabled:text-slate-500"
                        >
                            {activeTraderIds.includes(traderId) ? "Adjust Copy Settings" : "Start Copying"}
                        </button>
                        <button type="button" className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <StatCard title="Win Rate" value={formatPercent(data.trader.winRate)} helper="Mocked execution consistency across resolved trades." />
                    <StatCard title="Total P&L" value={`${formatCompactCurrency(data.trader.totalPnl)} USDC`} helper="Cumulative mocked performance for profile and leaderboard views." />
                    <StatCard title="Max Drawdown" value={formatPercent(data.trader.maxDrawdown)} helper="Used later by the copy configuration stop logic." trend="down" change="risk" />
                    <StatCard title="Avg Duration" value={data.trader.averageDuration} helper="Average time in market before exit." />
                    <StatCard title="Total Trades" value={String(data.trader.totalTrades)} helper="Trade count rendered in the profile table state." />
                    <StatCard title="Followers" value={data.trader.followers.toLocaleString()} helper="Public proof of demand in the discovery layer." />
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <div className="surface-panel p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Equity curve</p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Cumulative P&L</h2>
                        </div>
                        <div className="flex gap-2 text-xs">
                            {["1M", "3M", "6M", "All"].map((range) => (
                                <span key={range} className="rounded-full bg-white/6 px-3 py-2 text-slate-300">
                                    {range}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 h-64 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.equityCurve}>
                                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                                <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18 }} />
                                <Line type="monotone" dataKey="value" stroke="var(--color-chart-1)" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="surface-panel p-5">
                    <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Copy settings summary</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Follower-facing snapshot</h2>
                    {data.copySummary ? (
                        <div className="mt-6 space-y-4 text-sm text-slate-300">
                            <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
                                <p className="text-slate-500">Allocated capital</p>
                                <p className="mt-2 text-xl font-semibold text-white">{formatCompactCurrency(data.copySummary.allocatedCapital)} USDC</p>
                            </div>
                            <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
                                <p className="text-slate-500">Open copied positions</p>
                                <p className="mt-2 text-xl font-semibold text-white">{data.copySummary.activePositions}</p>
                            </div>
                            <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
                                <p className="text-slate-500">Unrealised P&L</p>
                                <p className="mt-2 text-xl font-semibold text-emerald-200">{formatCompactCurrency(data.copySummary.unrealizedPnl)} USDC</p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-white/4 p-5 text-sm leading-7 text-slate-300">
                            You are not copying this trader yet. Start the copy flow to see allocated capital, live positions, and follower-specific P&L here.
                        </div>
                    )}
                </div>
            </section>

            <section className="surface-panel p-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Trade history</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Recent execution log</h2>
                    </div>
                    <span className="pill-chip">50+ mocked trades</span>
                </div>

                <div className="mt-5 hidden overflow-hidden rounded-3xl border border-white/8 md:block">
                    <table className="min-w-full divide-y divide-white/8 text-left text-sm">
                        <thead className="bg-white/4 text-slate-400">
                            <tr>
                                {["Date", "Market", "Side", "Entry", "Exit", "Result", "P&L"].map((label) => (
                                    <th key={label} className="px-4 py-4 font-medium">{label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/6">
                            {data.trades.slice(0, 14).map((trade) => (
                                <tr key={trade.id} className="hover:bg-white/4">
                                    <td className="px-4 py-4 text-slate-400">{trade.timestampLabel}</td>
                                    <td className="px-4 py-4 text-white">{trade.market}</td>
                                    <td className="px-4 py-4">
                                        <span className={trade.side === "YES" ? "text-emerald-200" : "text-rose-200"}>{trade.side}</span>
                                    </td>
                                    <td className="px-4 py-4 text-slate-200">{trade.entryPrice.toFixed(2)}</td>
                                    <td className="px-4 py-4 text-slate-200">{trade.exitPrice.toFixed(2)}</td>
                                    <td className="px-4 py-4 text-slate-200">{trade.result}</td>
                                    <td className="px-4 py-4 text-emerald-200">{formatCompactCurrency(trade.pnl)} USDC</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5 grid gap-3 md:hidden">
                    {data.trades.slice(0, 10).map((trade) => (
                        <article key={trade.id} className="rounded-3xl border border-white/8 bg-white/4 p-4 text-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-medium text-white">{trade.market}</p>
                                    <p className="mt-1 text-xs text-slate-500">{trade.timestampLabel}</p>
                                </div>
                                <span className={trade.side === "YES" ? "text-emerald-200" : "text-rose-200"}>{trade.side}</span>
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-400">
                                <span>Entry {trade.entryPrice.toFixed(2)}</span>
                                <span>Exit {trade.exitPrice.toFixed(2)}</span>
                                <span>{trade.result}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}