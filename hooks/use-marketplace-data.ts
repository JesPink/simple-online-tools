"use client";

import { useQuery } from "@tanstack/react-query";

import { allTrades, followerDashboard, getTraderProfile, leaderboardTraders } from "@/lib/mock-data";

async function withDelay<T>(value: T, delay = 450) {
    await new Promise((resolve) => window.setTimeout(resolve, delay));
    return value;
}

export function useLeaderboard() {
    return useQuery({
        queryKey: ["leaderboard"],
        queryFn: () => withDelay(leaderboardTraders, 500),
        retry: false,
    });
}

export function useFollowerDashboard() {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: () => withDelay(followerDashboard, 420),
        retry: false,
    });
}

export function useTraderProfile(traderId: string) {
    return useQuery({
        queryKey: ["trader", traderId],
        queryFn: () => withDelay(getTraderProfile(traderId), 480),
        retry: false,
    });
}

export function useAllTrades() {
    return useQuery({
        queryKey: ["all-trades"],
        queryFn: () => withDelay(allTrades, 480),
        retry: false,
    });
}