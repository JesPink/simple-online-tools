import type {
    CopyFormValues,
    CopyRelationship,
    FollowerDashboard,
    MarketFilter,
    NotificationItem,
    StrategyCategory,
    TradeRecord,
    TraderProfile,
    TraderSummary,
} from "@/lib/types";

const traderNames = [
    "Cameron Vale",
    "Amina Shah",
    "Rowan Pike",
    "Nia Laurent",
    "Theo Mercer",
    "Sofia Kline",
    "Dorian Beck",
    "Lina Torres",
    "Malik Avery",
    "Elena Ward",
];

const strategyNames = [
    "High-conviction event scalping",
    "Sports macro momentum",
    "Volatility compression swing",
    "Live arb opportunity capture",
    "Narrative-driven election flow",
];

const markets = [
    "Champions League Final winner",
    "NBA Finals Game 6 total points",
    "French Open quarterfinal upset",
    "Presidential debate reaction market",
    "Formula 1 podium finish market",
    "Premier League relegation escape",
];

const strategyCategories: StrategyCategory[] = ["All Sports", "Politics", "Crypto", "Economy", "Entertainment"];

const categoryMarketLabel: Record<StrategyCategory, string> = {
    "All Sports": "Sports",
    Politics: "Politics",
    Crypto: "Crypto",
    Economy: "Economy",
    Entertainment: "Entertainment",
};

export const marketFilterOptions: MarketFilter[] = ["Soccer", "Basketball", "Politics", "Tennis"];

export const leaderboardTraders: TraderSummary[] = Array.from({ length: 60 }, (_, index) => {
    const base = index + 1;
    const direction = index % 2 === 0 ? 1 : -1;

    return {
        id: `trader-${base}`,
        rank: base,
        name: `${traderNames[index % traderNames.length]} ${String.fromCharCode(65 + (index % 6))}`,
        walletAddress: `0x${(930401 + base).toString(16)}0f${(base * 19).toString(16).padStart(3, "0")}a7${(base * 7)
            .toString(16)
            .padStart(2, "0")}`,
        strategy: strategyNames[index % strategyNames.length],
        winRate: 54 + ((index * 3) % 28),
        totalPnl: 42_500 + base * 11_200,
        followers: 120 + base * 47,
        capitalCopied: 210_000 + base * 38_500,
        totalTrades: 82 + base * 5,
        maxDrawdown: 6 + (index % 8) * 2.2,
        averageDuration: `${3 + (index % 6)}h ${(index * 7) % 60}m`,
        category: strategyCategories[index % strategyCategories.length],
        marketLabel: categoryMarketLabel[strategyCategories[index % strategyCategories.length]],
        monthlyPriceUsdc: 70 + (index % 5) * 15,
        verified: index % 3 !== 0,
        newCopiers: 40 + (index % 9) * 23,
        feeModel:
            index % 2 === 0
                ? {
                    type: "subscription",
                    amount: 79 + (index % 4) * 20,
                    label: `$${79 + (index % 4) * 20}/month`,
                }
                : {
                    type: "performance",
                    amount: 12 + (index % 4) * 2,
                    label: `${12 + (index % 4) * 2}% of profits`,
                },
        sparkline: Array.from({ length: 12 }, (_, point) => 48 + point * (3 + (index % 4)) + direction * ((point % 3) * 4)),
        performance: {
            allTime: 24 + base * 1.4,
            monthly: 4 + (base % 11) * 0.9,
            weekly: 0.6 + (base % 7) * 0.45,
        },
    };
});

function buildTrades(trader: TraderSummary): TradeRecord[] {
    return Array.from({ length: 56 }, (_, index) => {
        const base = index + 1;
        const side = base % 2 === 0 ? "YES" : "NO";
        const result = base % 5 === 0 ? "Pending" : base % 3 === 0 ? "Loss" : "Win";
        const timestamp = new Date(Date.now() - base * 1000 * 60 * 60 * 9);
        const entryPrice = 0.42 + ((base + trader.rank) % 40) / 100;
        const exitPrice = result === "Pending" ? entryPrice + 0.02 : result === "Win" ? entryPrice + 0.08 : entryPrice - 0.07;

        return {
            id: `${trader.id}-trade-${base}`,
            traderId: trader.id,
            traderName: trader.name,
            market: `${markets[(base + trader.rank) % markets.length]} #${base}`,
            sport: ["Soccer", "Basketball", "Politics", "Tennis"][base % 4],
            side,
            entryPrice: Number(entryPrice.toFixed(2)),
            exitPrice: Number(exitPrice.toFixed(2)),
            result,
            pnl: Number((result === "Win" ? 80 + base * 2.6 : result === "Loss" ? -55 - base * 1.9 : 22 + base * 1.1).toFixed(2)),
            status: result === "Pending" ? "Open" : "Closed",
            timestamp,
            timestampLabel: timestamp.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
            }),
        };
    });
}

const tradeBook = new Map(leaderboardTraders.map((trader) => [trader.id, buildTrades(trader)]));

export const allTrades = leaderboardTraders.flatMap((trader) => tradeBook.get(trader.id)!.slice(0, 3)).slice(0, 80);

export const initialCopyRelationships: CopyRelationship[] = leaderboardTraders.slice(0, 2).map((trader, index) => ({
    traderId: trader.id,
    allocatedCapital: 8_000 + index * 3_500,
    sizingMode: index % 2 === 0 ? "fixed" : "proportional",
    fixedAmount: 350 + index * 60,
    proportionalPercentage: 55 + index * 10,
    maxTotalExposure: 2_400 + index * 750,
    maxDrawdownStop: 18 + index * 4,
    marketFilters: marketFilterOptions.slice(0, 2 + index),
    agreeToTerms: true,
    activePositions: 3 + index,
    realizedPnl: 1_250 + index * 780,
    unrealizedPnl: 320 + index * 180,
}));

export function createCopyDraft(trader: TraderSummary, existing?: CopyRelationship | null): CopyFormValues {
    if (existing) {
        return {
            allocatedCapital: existing.allocatedCapital,
            sizingMode: existing.sizingMode,
            fixedAmount: existing.fixedAmount,
            proportionalPercentage: existing.proportionalPercentage,
            maxTotalExposure: existing.maxTotalExposure,
            maxDrawdownStop: existing.maxDrawdownStop,
            marketFilters: existing.marketFilters,
            agreeToTerms: existing.agreeToTerms,
        };
    }

    return {
        allocatedCapital: Math.min(6_000 + trader.rank * 60, 14_000),
        sizingMode: trader.rank % 2 === 0 ? "fixed" : "proportional",
        fixedAmount: 250 + (trader.rank % 6) * 50,
        proportionalPercentage: 60,
        maxTotalExposure: 1_800 + (trader.rank % 5) * 350,
        maxDrawdownStop: 18,
        marketFilters: marketFilterOptions.slice(0, 2),
        agreeToTerms: false,
    };
}

export function buildRelationshipFromForm(values: CopyFormValues, existing?: CopyRelationship | null): CopyRelationship {
    return {
        traderId: existing?.traderId ?? "",
        allocatedCapital: values.allocatedCapital,
        sizingMode: values.sizingMode,
        fixedAmount: values.fixedAmount,
        proportionalPercentage: values.proportionalPercentage,
        maxTotalExposure: values.maxTotalExposure,
        maxDrawdownStop: values.maxDrawdownStop,
        marketFilters: values.marketFilters,
        agreeToTerms: values.agreeToTerms,
        activePositions: existing?.activePositions ?? 2,
        realizedPnl: existing?.realizedPnl ?? 0,
        unrealizedPnl: existing?.unrealizedPnl ?? 0,
    };
}

export function buildFollowerDashboard(relationships: CopyRelationship[]): FollowerDashboard {
    const activeTraders = relationships
        .map((relationship) => {
            const trader = getTraderById(relationship.traderId);

            if (!trader) {
                return null;
            }

            return {
                trader,
                relationship,
                allocatedCapital: relationship.allocatedCapital,
                positionCount: relationship.activePositions,
                realizedPnl: relationship.realizedPnl,
                unrealizedPnl: relationship.unrealizedPnl,
            };
        })
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

    const totalInvested = activeTraders.reduce((sum, entry) => sum + entry.allocatedCapital, 0);
    const realizedPnl = activeTraders.reduce((sum, entry) => sum + entry.realizedPnl, 0);
    const unrealizedPnl = activeTraders.reduce((sum, entry) => sum + entry.unrealizedPnl, 0);
    const followedIds = new Set(activeTraders.map((entry) => entry.trader.id));
    const liveFeed = allTrades.filter((trade) => followedIds.has(trade.traderId)).slice(0, 10);

    return {
        totalInvested,
        realizedPnl,
        unrealizedPnl,
        activeTraders,
        liveFeed,
    };
}

export const followerDashboard = buildFollowerDashboard(initialCopyRelationships);

export function getTraderById(traderId: string) {
    return leaderboardTraders.find((trader) => trader.id === traderId);
}

export function getTraderProfile(traderId: string, relationships: CopyRelationship[] = initialCopyRelationships): TraderProfile | null {
    const trader = getTraderById(traderId);

    if (!trader) {
        return null;
    }

    return {
        trader,
        equityCurve: Array.from({ length: 12 }, (_, index) => ({
            label: `W${index + 1}`,
            value: 2_000 + index * 1_450 + (index % 3) * 460 + trader.rank * 32,
        })),
        trades: tradeBook.get(traderId) ?? [],
        copySummary: relationships.find((relationship) => relationship.traderId === traderId)
            ? {
                allocatedCapital: relationships.find((relationship) => relationship.traderId === traderId)!.allocatedCapital,
                activePositions: relationships.find((relationship) => relationship.traderId === traderId)!.activePositions,
                unrealizedPnl: relationships.find((relationship) => relationship.traderId === traderId)!.unrealizedPnl,
            }
            : null,
    };
}

export const notificationSeed: NotificationItem[] = allTrades.slice(0, 4).map((trade, index) => ({
    id: `notification-${index + 1}`,
    traderId: trade.traderId,
    side: trade.side,
    createdAt: new Date(Date.now() - (index + 1) * 1000 * 65),
    message: `Copied ${trade.traderName}: Bought ${trade.side} on '${trade.market}' at $${trade.entryPrice.toFixed(2)}`,
    detail: `Size: ${100 + index * 25} USDC`,
    read: index > 0,
    kind: "trade",
}));

export function nextNotification(index: number): NotificationItem {
    const trade = allTrades[index % allTrades.length];

    return {
        id: `notification-live-${index + 1}`,
        traderId: trade.traderId,
        side: trade.side,
        createdAt: new Date(),
        message: `Copied ${trade.traderName}: Bought ${trade.side} on '${trade.market}' at $${trade.entryPrice.toFixed(2)}`,
        detail: `Size: ${130 + (index % 5) * 25} USDC`,
        read: false,
        kind: "trade",
    };
}

export function createCopySavedNotification(trader: TraderSummary, relationship: CopyRelationship, updated = false): NotificationItem {
    return {
        id: `copy-save-${trader.id}-${Date.now()}`,
        traderId: trader.id,
        side: "YES",
        createdAt: new Date(),
        message: `${updated ? "Updated" : "Started"} copy settings for ${trader.name}`,
        detail: `${relationship.allocatedCapital.toLocaleString()} USDC allocated • ${trader.feeModel.label}`,
        read: false,
        kind: "copy",
    };
}

export function createStopCopyNotification(trader: TraderSummary): NotificationItem {
    return {
        id: `copy-stop-${trader.id}-${Date.now()}`,
        traderId: trader.id,
        side: "NO",
        createdAt: new Date(),
        message: `Stopped copying ${trader.name}`,
        detail: "Open positions remain visible in mocked history for showcase purposes.",
        read: false,
        kind: "system",
    };
}