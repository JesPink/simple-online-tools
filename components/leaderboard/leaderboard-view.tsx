"use client";

import Link from "next/link";
import { BarChart3, Briefcase, Flame, Globe, Landmark, Search, SlidersHorizontal, Star, Trophy } from "lucide-react";
import { useDeferredValue, useMemo, useState, type ReactNode } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { useMarketplace } from "@/components/providers/marketplace-provider";
import { formatCompactCurrency, formatPercent } from "@/lib/format";
import { traderRoute } from "@/lib/navigation";
import type { StrategyCategory, TraderSummary } from "@/lib/types";
import { useLeaderboard } from "@/hooks/use-marketplace-data";

const timeframeTabs = [
    { label: "All Time", key: "allTime" },
    { label: "Monthly", key: "monthly" },
    { label: "Weekly", key: "weekly" },
] as const;

const categoryTabs: Array<{ label: StrategyCategory; icon: ReactNode }> = [
    { label: "All Sports", icon: <Flame className="size-4" /> },
    { label: "Politics", icon: <Landmark className="size-4" /> },
    { label: "Crypto", icon: <BarChart3 className="size-4" /> },
    { label: "Economy", icon: <Globe className="size-4" /> },
    { label: "Entertainment", icon: <Star className="size-4" /> },
];

type TimeframeKey = (typeof timeframeTabs)[number]["key"];
type SortKey = "rank" | "winRate" | "totalPnl" | "followers" | "capitalCopied" | "performance";

const timeframeMetricLabel: Record<TimeframeKey, string> = {
    allTime: "All-Time PnL",
    monthly: "1M PnL",
    weekly: "1W PnL",
};

const timeframeChartLabel: Record<TimeframeKey, string> = {
    allTime: "All-Time Performance",
    monthly: "1M Performance",
    weekly: "1W Performance",
};

function Sparkline({ points }: { points: number[] }) {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const delta = max - min || 1;

    const d = points
        .map((point, index) => {
            const x = (index / (points.length - 1)) * 100;
            const y = 24 - ((point - min) / delta) * 20;
            return `${index === 0 ? "M" : "L"}${x},${y}`;
        })
        .join(" ");

    return (
        <svg viewBox="0 0 100 24" className="h-8 w-full overflow-visible">
            <defs>
                <linearGradient id="leader-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
            </defs>
            <path d={d} fill="none" stroke="url(#leader-line)" strokeWidth="2.3" strokeLinecap="round" />
        </svg>
    );
}

function strategySortValue(trader: TraderSummary, sortKey: SortKey, timeframe: TimeframeKey) {
    if (sortKey === "performance") {
        return trader.performance[timeframe];
    }

    if (sortKey === "followers") {
        return trader.followers;
    }

    if (sortKey === "capitalCopied") {
        return trader.capitalCopied;
    }

    return trader[sortKey];
}

export function LeaderboardView() {
    const { data, isError, isLoading } = useLeaderboard();
    const { activeTraderIds, openCopyConfigurator } = useMarketplace();
    const [timeframe, setTimeframe] = useState<TimeframeKey>("monthly");
    const [sortKey, setSortKey] = useState<SortKey>("performance");
    const [direction, setDirection] = useState<"asc" | "desc">("desc");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<StrategyCategory>("All Sports");
    const deferredSearch = useDeferredValue(search);

    const filtered = useMemo(() => {
        const source = data ?? [];
        const searched = source.filter((trader) => trader.name.toLowerCase().includes(deferredSearch.trim().toLowerCase()));
        const categoryFiltered = category === "All Sports" ? searched : searched.filter((trader) => trader.category === category);

        return [...categoryFiltered].sort((left, right) => {
            const leftValue = Number(strategySortValue(left, sortKey, timeframe));
            const rightValue = Number(strategySortValue(right, sortKey, timeframe));
            return direction === "asc" ? leftValue - rightValue : rightValue - leftValue;
        });
    }, [category, data, deferredSearch, direction, sortKey, timeframe]);

    const topStats = useMemo(() => {
        const totalVolume = filtered.reduce((sum, trader) => sum + trader.capitalCopied, 0);
        const totalPnl = filtered.reduce((sum, trader) => sum + trader.totalPnl, 0);
        const activeStrategies = filtered.length;
        const avgWinRate = activeStrategies > 0 ? filtered.reduce((sum, trader) => sum + trader.winRate, 0) / activeStrategies : 0;

        return [
            { label: "Total Volume", value: `${formatCompactCurrency(totalVolume)} USDC`, delta: "+18.6%", icon: "$" },
            { label: "Total PnL (All)", value: `${formatCompactCurrency(totalPnl)} USDC`, delta: "+21.3%", icon: "↗" },
            { label: "Active Strategies", value: String(activeStrategies), delta: "+15", icon: "●" },
            { label: "Win Rate (All)", value: formatPercent(avgWinRate), delta: "+4.6%", icon: "%" },
        ];
    }, [filtered]);

    if (isError) {
        return <ErrorState title="Leaderboard data is unavailable." description="The trader seed failed to load for this prototype view." />;
    }

    return (
        <div className="space-y-6">
            <section className="surface-panel-strong relative overflow-hidden px-6 py-8 md:px-10 md:py-10">
                <div className="absolute -right-20 -top-20 size-72 rounded-full bg-cyan-400/15 blur-3xl" />
                <div className="absolute -bottom-24 right-20 size-72 rounded-full bg-blue-500/12 blur-3xl" />
                <div className="relative grid gap-7 xl:grid-cols-[1.08fr_0.92fr]">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase text-cyan-100">
                            <Briefcase className="size-3.5" />
                            PolyStrategies
                        </div>
                        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-6xl">
                            Copy top strategies on <span className="text-cyan-300">Polymarket</span>
                        </h1>
                        <p className="max-w-2xl text-base leading-8 text-slate-300">
                            Discover, analyze, and copy the best performing strategies with market-level filters, transparent pricing, and instant copy controls.
                        </p>
                    </div>

                    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-br from-cyan-400/16 via-blue-500/10 to-slate-950/80 p-6">
                        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                            <p className="text-xs font-semibold tracking-[0.15em] text-slate-400 uppercase">Polymarket signal panel</p>
                            <p className="mt-3 text-3xl font-semibold text-white">+24.7%</p>
                            <p className="mt-1 text-sm text-emerald-300">Top strategy, last 30 days</p>
                        </div>
                        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                            <Sparkline points={filtered[0]?.sparkline ?? [50, 58, 57, 66, 62, 70, 74, 73, 78, 83, 88, 91]} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {topStats.map((item) => (
                    <article key={item.label} className="surface-panel relative overflow-hidden p-5">
                        <div className="absolute -right-12 -top-12 size-24 rounded-full bg-cyan-300/10 blur-2xl" />
                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">{item.label}</span>
                                <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-cyan-200">{item.icon}</span>
                            </div>
                            <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{item.value}</p>
                            <p className="mt-2 text-sm font-semibold text-emerald-300">{item.delta}</p>
                        </div>
                    </article>
                ))}
            </section>

            <section className="surface-panel p-4 md:p-5">
                <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {categoryTabs.map((tab) => (
                        <button
                            key={tab.label}
                            type="button"
                            onClick={() => setCategory(tab.label)}
                            className={[
                                "inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition",
                                category === tab.label
                                    ? "border-cyan-300/30 bg-cyan-400/16 text-cyan-100"
                                    : "border-white/8 bg-white/4 text-slate-300 hover:border-white/14 hover:text-white",
                            ].join(" ")}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-[1.2fr_0.65fr_0.65fr_auto]">
                    <label className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-slate-300">
                        <Search className="size-4 text-slate-500" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search strategies..."
                            className="w-full bg-transparent outline-none placeholder:text-slate-500"
                        />
                    </label>

                    <label className="flex h-12 items-center rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-slate-300">
                        <span className="mr-2 text-slate-500">Sort:</span>
                        <select
                            value={sortKey}
                            onChange={(event) => setSortKey(event.target.value as SortKey)}
                            className="w-full bg-transparent text-white outline-none"
                        >
                            <option value="performance">1M PnL</option>
                            <option value="winRate">Win Rate</option>
                            <option value="followers">Followers</option>
                            <option value="capitalCopied">Capital Under Copy</option>
                            <option value="totalPnl">Total PnL</option>
                        </select>
                    </label>

                    <label className="flex h-12 items-center rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-slate-300">
                        <span className="mr-2 text-slate-500">Time:</span>
                        <select
                            value={timeframe}
                            onChange={(event) => setTimeframe(event.target.value as TimeframeKey)}
                            className="w-full bg-transparent text-white outline-none"
                        >
                            {timeframeTabs.map((tab) => (
                                <option key={tab.key} value={tab.key}>
                                    {tab.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button
                        type="button"
                        onClick={() => setDirection((current) => (current === "desc" ? "asc" : "desc"))}
                        className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-slate-200 transition hover:bg-white/10"
                    >
                        <SlidersHorizontal className="size-4" />
                    </button>
                </div>
            </section>

            {isLoading ? <LoadingSkeleton rows={6} /> : null}

            {!isLoading && filtered.length === 0 ? (
                <EmptyState
                    eyebrow="No matches"
                    title="No strategies in this category yet."
                    description="Try another market category or search term to view active strategy cards."
                />
            ) : null}

            {!isLoading && filtered.length > 0 ? (
                <section className="space-y-4">
                    {filtered.slice(0, 12).map((trader) => {
                        const isActive = activeTraderIds.includes(trader.id);
                        const periodPerformance = trader.performance[timeframe];

                        return (
                            <article
                                key={trader.id}
                                className="surface-panel relative overflow-hidden border-white/12 p-5 md:p-6"
                            >
                                <div className="absolute -right-20 top-1/2 size-44 -translate-y-1/2 rounded-full bg-cyan-400/8 blur-3xl" />
                                <div className="relative grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                                    <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-start">
                                        <div className="space-y-2">
                                            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-xl bg-amber-300 px-2 text-xs font-bold text-slate-950">
                                                #{trader.rank}
                                            </span>
                                            <div className="size-16 rounded-2xl border border-white/12 bg-gradient-to-br from-cyan-400/25 via-blue-500/20 to-slate-900" />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Link href={traderRoute(trader.id)} className="text-2xl font-semibold text-white hover:text-cyan-200">
                                                    {trader.name}
                                                </Link>
                                                {trader.verified ? <span className="rounded-full bg-cyan-400/14 px-2 py-0.5 text-[11px] font-semibold text-cyan-100">Verified</span> : null}
                                            </div>
                                            <p className="mt-2 text-sm text-slate-400">{trader.marketLabel}</p>
                                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{trader.strategy}</p>
                                            <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
                                                <span>{trader.followers.toLocaleString()} copiers</span>
                                                <span className="text-emerald-300">+{trader.newCopiers} new</span>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                                            <p className="text-xs text-slate-500">Price / Month</p>
                                            <p className="mt-2 text-2xl font-semibold text-white">{trader.monthlyPriceUsdc} USDC</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                                        <div className="space-y-2 text-sm">
                                            <p className="text-slate-500">{timeframeMetricLabel[timeframe]}</p>
                                            <p className="text-4xl font-semibold text-emerald-300">{formatPercent(periodPerformance)}</p>
                                            <p className="pt-1 text-slate-400">Win Rate {formatPercent(trader.winRate)}</p>
                                            <p className="text-slate-400">Profit Factor {(1.35 + (trader.rank % 5) * 0.21).toFixed(2)}</p>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-4">
                                            <p className="text-xs text-slate-500">{timeframeChartLabel[timeframe]}</p>
                                            <div className="mt-3 h-12 w-44 max-w-full">
                                                <Sparkline points={trader.sparkline} />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => openCopyConfigurator(trader.id, "leaderboard")}
                                            className="rounded-2xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                                        >
                                            {isActive ? "Adjust Copy" : "Copy"}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>
            ) : null}

            {!isLoading && filtered.length > 12 ? (
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                    >
                        <Trophy className="size-4" />
                        Showing top 12 strategies
                    </button>
                </div>
            ) : null}
        </div>
    );
}
