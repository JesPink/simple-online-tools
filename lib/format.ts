export function formatCompactCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: value >= 1000 ? 1 : 0,
    }).format(value);
}

export function formatPercent(value: number) {
    return `${value.toFixed(1)}%`;
}

export function truncateWallet(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}