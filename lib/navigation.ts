import type { Route } from "next";

export type NavigationIcon = "ChartNoAxesCombined" | "LayoutDashboard" | "Menu" | "Cog";

export const primaryNavigation = [
    { href: "/" as Route, label: "Leaderboard", icon: "ChartNoAxesCombined" as NavigationIcon },
    { href: "/dashboard" as Route, label: "My Dashboard", icon: "LayoutDashboard" as NavigationIcon },
    { href: "/trade-history" as Route, label: "Trade History", icon: "Menu" as NavigationIcon },
    { href: "/settings" as Route, label: "Settings", icon: "Cog" as NavigationIcon },
];

export function traderRoute(id: string) {
    return `/trader/${id}` as Route;
}