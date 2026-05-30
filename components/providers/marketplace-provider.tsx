"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import {
    buildFollowerDashboard,
    createCopySavedNotification,
    createStopCopyNotification,
    getTraderById,
    initialCopyRelationships,
    nextNotification,
    notificationSeed,
} from "@/lib/mock-data";
import type { CopyFormValues, CopyRelationship, FollowerDashboard, NotificationItem, TraderSummary } from "@/lib/types";

type CopyModalState = {
    isOpen: boolean;
    trader: TraderSummary | null;
    mode: "create" | "edit";
    source: "leaderboard" | "profile" | "dashboard" | "header";
};

type MarketplaceContextValue = {
    isConnected: boolean;
    walletAddress: string;
    walletBalance: number;
    notifications: NotificationItem[];
    unreadCount: number;
    dashboard: FollowerDashboard;
    copyRelationships: CopyRelationship[];
    activeTraderIds: string[];
    copyModal: CopyModalState;
    toggleConnection: () => void;
    markNotificationsRead: () => void;
    openWalletOnboarding: () => void;
    openCopyConfigurator: (traderId: string, source: CopyModalState["source"]) => void;
    closeCopyConfigurator: () => void;
    saveCopyConfiguration: (values: CopyFormValues) => { ok: boolean; message?: string };
    stopCopying: (traderId: string) => void;
    getRelationship: (traderId: string) => CopyRelationship | null;
};

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

type MarketplaceProviderProps = {
    children: React.ReactNode;
};

const MOCK_WALLET_BALANCE = 12_450;

export function MarketplaceProvider({ children }: MarketplaceProviderProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>(notificationSeed);
    const [unreadCount, setUnreadCount] = useState(notificationSeed.filter((entry) => !entry.read).length);
    const [copyRelationships, setCopyRelationships] = useState<CopyRelationship[]>(initialCopyRelationships);
    const [copyModal, setCopyModal] = useState<CopyModalState>({
        isOpen: false,
        trader: null,
        mode: "create",
        source: "header",
    });
    const nextIndexRef = useRef(notificationSeed.length);

    const dashboard = useMemo(() => buildFollowerDashboard(copyRelationships), [copyRelationships]);
    const activeTraderIds = useMemo(() => copyRelationships.map((relationship) => relationship.traderId), [copyRelationships]);

    useEffect(() => {
        if (!isConnected || copyRelationships.length === 0) {
            return undefined;
        }

        const intervalId = window.setInterval(() => {
            const created = nextNotification(nextIndexRef.current);
            const isRelevant = activeTraderIds.includes(created.traderId);
            nextIndexRef.current += 1;

            if (!isRelevant) {
                return;
            }

            setNotifications((current) => [created, ...current].slice(0, 50));
            setUnreadCount((current) => Math.min(current + 1, 50));
            toast(created.message, {
                description: created.detail,
            });
        }, 12_000);

        return () => window.clearInterval(intervalId);
    }, [activeTraderIds, copyRelationships.length, isConnected]);

    const getRelationship = (traderId: string) => copyRelationships.find((relationship) => relationship.traderId === traderId) ?? null;

    const openWalletOnboarding = () => {
        setCopyModal({
            isOpen: true,
            trader: null,
            mode: "create",
            source: "header",
        });
    };

    const openCopyConfigurator = (traderId: string, source: CopyModalState["source"]) => {
        const trader = getTraderById(traderId);

        if (!trader) {
            return;
        }

        setCopyModal({
            isOpen: true,
            trader,
            mode: getRelationship(traderId) ? "edit" : "create",
            source,
        });
    };

    const closeCopyConfigurator = () => {
        setCopyModal((current) => ({ ...current, isOpen: false, trader: null }));
    };

    const toggleConnection = () => {
        setIsConnected((current) => !current);
        if (!isConnected) {
            toast("Wallet connected", {
                description: "Mock wallet state enabled for the follower experience.",
            });
        } else {
            toast("Wallet disconnected", {
                description: "Copy actions are now gated until the wallet is reconnected.",
            });
        }
    };

    const pushNotification = (entry: NotificationItem) => {
        setNotifications((current) => [entry, ...current].slice(0, 50));
        setUnreadCount((current) => Math.min(current + 1, 50));
    };

    const saveCopyConfiguration = (values: CopyFormValues) => {
        const trader = copyModal.trader;

        if (!trader) {
            return { ok: false, message: "Select a trader before configuring copy settings." };
        }

        if (!isConnected) {
            return { ok: false, message: "Connect your wallet to start copying." };
        }

        if (values.allocatedCapital > MOCK_WALLET_BALANCE) {
            return { ok: false, message: "Allocated capital exceeds the mocked wallet balance." };
        }

        if (!values.agreeToTerms) {
            return { ok: false, message: "You must agree to the non-custodial terms to continue." };
        }

        const existing = getRelationship(trader.id);
        const nextRelationship: CopyRelationship = {
            traderId: trader.id,
            allocatedCapital: values.allocatedCapital,
            sizingMode: values.sizingMode,
            fixedAmount: values.fixedAmount,
            proportionalPercentage: values.proportionalPercentage,
            maxTotalExposure: values.maxTotalExposure,
            maxDrawdownStop: values.maxDrawdownStop,
            marketFilters: values.marketFilters,
            agreeToTerms: values.agreeToTerms,
            activePositions: existing?.activePositions ?? 2 + (trader.rank % 3),
            realizedPnl: existing?.realizedPnl ?? 240 + trader.rank * 12,
            unrealizedPnl: existing?.unrealizedPnl ?? 85 + trader.rank * 6,
        };

        setCopyRelationships((current) => {
            const withoutCurrent = current.filter((relationship) => relationship.traderId !== trader.id);
            return [nextRelationship, ...withoutCurrent];
        });

        pushNotification(createCopySavedNotification(trader, nextRelationship, Boolean(existing)));
        toast(existing ? "Copy settings updated" : "Copy started", {
            description: `${trader.name} now appears in the follower dashboard with mocked live activity.`,
        });
        closeCopyConfigurator();

        return { ok: true };
    };

    const stopCopying = (traderId: string) => {
        const trader = getTraderById(traderId);
        setCopyRelationships((current) => current.filter((relationship) => relationship.traderId !== traderId));

        if (trader) {
            pushNotification(createStopCopyNotification(trader));
            toast("Copy stopped", {
                description: `${trader.name} has been removed from the active dashboard view.`,
            });
        }
    };

    const value: MarketplaceContextValue = {
        isConnected,
        walletAddress: "0x9bf4...a17c",
        walletBalance: MOCK_WALLET_BALANCE,
        notifications,
        unreadCount,
        dashboard,
        copyRelationships,
        activeTraderIds,
        copyModal,
        toggleConnection,
        markNotificationsRead: () => {
            setUnreadCount(0);
            setNotifications((current) => current.map((entry) => ({ ...entry, read: true })));
        },
        openWalletOnboarding,
        openCopyConfigurator,
        closeCopyConfigurator,
        saveCopyConfiguration,
        stopCopying,
        getRelationship,
    };

    return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
    const context = useContext(MarketplaceContext);

    if (!context) {
        throw new Error("useMarketplace must be used within MarketplaceProvider.");
    }

    return context;
}