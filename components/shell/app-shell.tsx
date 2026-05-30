"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChartNoAxesCombined, Cog, LayoutDashboard, Menu, Wallet } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";

import { useMarketplace } from "@/components/providers/marketplace-provider";
import { CopyConfigModal } from "@/components/marketplace/copy-config-modal";
import { formatCompactCurrency, truncateWallet } from "@/lib/format";
import { primaryNavigation } from "@/lib/navigation";

type AppShellProps = {
    children: React.ReactNode;
};

const iconMap = {
    Bell,
    ChartNoAxesCombined,
    Cog,
    LayoutDashboard,
    Menu,
    Wallet,
};

export function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const { isConnected, markNotificationsRead, notifications, openWalletOnboarding, toggleConnection, unreadCount, walletAddress, walletBalance } =
        useMarketplace();

    useEffect(() => {
        if (!isNotificationOpen) {
            return undefined;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (!panelRef.current?.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isNotificationOpen]);

    return (
        <div className="min-h-screen text-slate-100">
            <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-white/8 bg-slate-950/80 px-5 py-6 backdrop-blur-xl lg:block">
                <div className="flex h-full flex-col gap-8">
                    <Link href="/" className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 py-3">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-400/14 text-cyan-200 shadow-[0_0_40px_-18px_rgba(34,211,238,0.7)]">
                            <ChartNoAxesCombined className="size-5" />
                        </div>
                        <div className="hidden min-w-0 lg:block">
                            <p className="text-sm font-semibold tracking-[0.16em] text-cyan-100 uppercase">Polymarket</p>
                            <p className="mt-1 text-xs text-slate-400">Copy-trading marketplace</p>
                        </div>
                    </Link>

                    <nav className="flex flex-1 flex-col gap-2">
                        {primaryNavigation.map((item) => {
                            const Icon = iconMap[item.icon];
                            const active = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={[
                                        "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                                        active
                                            ? "bg-cyan-400/16 text-cyan-50 shadow-[0_20px_60px_-40px_rgba(56,189,248,0.85)]"
                                            : "text-slate-400 hover:bg-white/6 hover:text-white",
                                    ].join(" ")}
                                >
                                    <Icon className="size-5 shrink-0" />
                                    <span className="hidden lg:inline">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden rounded-3xl border border-cyan-300/10 bg-cyan-400/8 p-4 text-xs leading-6 text-slate-300 lg:block">
                        Mock-first workspace. Wallet, trade execution, and billing remain simulated until backend and smart-order routing arrive.
                    </div>
                </div>
            </aside>

            <div className="pb-24 lg:pb-0 lg:pl-72">
                <header className="sticky top-0 z-10 border-b border-white/8 bg-slate-950/65 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
                        <div className="min-w-0">
                            <p className="text-[10px] font-semibold tracking-[0.18em] text-slate-500 uppercase md:text-xs">Follower workspace</p>
                            <h1 className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-white sm:text-base md:text-xl">
                                Discover, configure, and monitor copied traders
                            </h1>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 md:gap-3">
                            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 md:flex md:items-center md:gap-2">
                                <Wallet className="size-4 text-cyan-200" />
                                <span>{formatCompactCurrency(walletBalance)} USDC</span>
                            </div>

                            <div ref={panelRef} className="relative">
                                <button
                                    type="button"
                                    aria-label="Notifications"
                                    onClick={() => {
                                        setIsNotificationOpen((current) => !current);
                                        markNotificationsRead();
                                    }}
                                    className="relative rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/10 md:p-3"
                                >
                                    <Bell className="size-4" />
                                    {unreadCount > 0 ? (
                                        <span className="absolute right-2 top-2 size-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]" />
                                    ) : null}
                                </button>

                                {isNotificationOpen ? (
                                    <div className="absolute right-0 top-12 z-30 w-[calc(100vw-2rem)] max-w-[22rem] rounded-3xl border border-white/10 bg-slate-950/96 p-3 shadow-2xl shadow-black/50 md:top-14">
                                        <div className="flex items-center justify-between px-2 py-2">
                                            <p className="text-sm font-semibold text-white">Recent trade copies</p>
                                            <span className="text-xs text-slate-400">{notifications.length} tracked</span>
                                        </div>
                                        <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
                                            {notifications.length === 0 ? (
                                                <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-400">
                                                    No notifications yet.
                                                </div>
                                            ) : (
                                                notifications.map((entry) => (
                                                    <div key={entry.id} className="rounded-2xl border border-white/6 bg-white/4 p-3 text-sm">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <p className="leading-6 text-slate-100">{entry.message}</p>
                                                            <span
                                                                className={[
                                                                    "mt-1 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
                                                                    entry.side === "YES"
                                                                        ? "bg-emerald-400/16 text-emerald-200"
                                                                        : "bg-rose-400/16 text-rose-200",
                                                                ].join(" ")}
                                                            >
                                                                {entry.side}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-xs leading-5 text-slate-400">{entry.detail}</p>
                                                        <p className="mt-2 text-[11px] text-slate-500">
                                                            {formatDistanceToNow(entry.createdAt, { addSuffix: true })}
                                                        </p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    if (isConnected) {
                                        toggleConnection();
                                        return;
                                    }

                                    openWalletOnboarding();
                                }}
                                className={[
                                    "rounded-full px-3 py-2 text-xs font-semibold transition md:px-4 md:text-sm",
                                    isConnected
                                        ? "border border-emerald-300/20 bg-emerald-400/12 text-emerald-100 hover:bg-emerald-300/18"
                                        : "border border-cyan-300/20 bg-cyan-400/14 text-cyan-100 hover:bg-cyan-300/18",
                                ].join(" ")}
                            >
                                {isConnected ? truncateWallet(walletAddress) : "Connect Wallet"}
                            </button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-8">{children}</main>
            </div>

            <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-slate-950/95 px-3 py-2 backdrop-blur-lg lg:hidden">
                <div className="grid grid-cols-4 gap-2">
                    {primaryNavigation.map((item) => {
                        const Icon = iconMap[item.icon];
                        const active = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    "flex flex-col items-center justify-center rounded-xl px-2 py-2 text-[11px] font-medium transition",
                                    active ? "bg-cyan-400/18 text-cyan-100" : "text-slate-400 hover:bg-white/6 hover:text-white",
                                ].join(" ")}
                            >
                                <Icon className="mb-1 size-4" />
                                <span className="truncate">{item.label.replace("My ", "")}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <CopyConfigModal />
        </div>
    );
}