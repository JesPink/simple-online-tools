export type TradeSide = "YES" | "NO";
export type TradeResult = "Win" | "Loss" | "Pending";
export type MarketFilter = "Soccer" | "Basketball" | "Politics" | "Tennis";
export type CopySizingMode = "fixed" | "proportional";
export type StrategyCategory = "All Sports" | "Politics" | "Crypto" | "Economy" | "Entertainment";

export type TraderFeeModel =
    | {
        type: "subscription";
        amount: number;
        label: string;
    }
    | {
        type: "performance";
        amount: number;
        label: string;
    };

export type TraderSummary = {
    id: string;
    rank: number;
    name: string;
    walletAddress: string;
    strategy: string;
    winRate: number;
    totalPnl: number;
    followers: number;
    capitalCopied: number;
    totalTrades: number;
    maxDrawdown: number;
    averageDuration: string;
    category: StrategyCategory;
    marketLabel: string;
    monthlyPriceUsdc: number;
    verified: boolean;
    newCopiers: number;
    feeModel: TraderFeeModel;
    sparkline: number[];
    performance: {
        allTime: number;
        monthly: number;
        weekly: number;
    };
};

export type TradeRecord = {
    id: string;
    traderId: string;
    traderName: string;
    market: string;
    sport: string;
    side: TradeSide;
    entryPrice: number;
    exitPrice: number;
    result: TradeResult;
    pnl: number;
    status: string;
    timestamp: Date;
    timestampLabel: string;
};

export type NotificationItem = {
    id: string;
    traderId: string;
    side: TradeSide;
    createdAt: Date;
    message: string;
    detail: string;
    read: boolean;
    kind: "trade" | "copy" | "system";
};

export type CopyRelationship = {
    traderId: string;
    allocatedCapital: number;
    sizingMode: CopySizingMode;
    fixedAmount: number;
    proportionalPercentage: number;
    maxTotalExposure: number;
    maxDrawdownStop: number;
    marketFilters: MarketFilter[];
    agreeToTerms: boolean;
    activePositions: number;
    realizedPnl: number;
    unrealizedPnl: number;
};

export type CopyFormValues = {
    allocatedCapital: number;
    sizingMode: CopySizingMode;
    fixedAmount: number;
    proportionalPercentage: number;
    maxTotalExposure: number;
    maxDrawdownStop: number;
    marketFilters: MarketFilter[];
    agreeToTerms: boolean;
};

export type FollowerTraderEntry = {
    trader: TraderSummary;
    relationship: CopyRelationship;
    allocatedCapital: number;
    positionCount: number;
    realizedPnl: number;
    unrealizedPnl: number;
};

export type FollowerDashboard = {
    totalInvested: number;
    realizedPnl: number;
    unrealizedPnl: number;
    activeTraders: FollowerTraderEntry[];
    liveFeed: TradeRecord[];
};

export type TraderProfile = {
    trader: TraderSummary;
    equityCurve: Array<{ label: string; value: number }>;
    trades: TradeRecord[];
    copySummary: {
        allocatedCapital: number;
        activePositions: number;
        unrealizedPnl: number;
    } | null;
};