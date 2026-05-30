import type { Route } from "next";

import { EmptyState } from "@/components/common/empty-state";

type ErrorStateProps = {
    title?: string;
    description?: string;
    actionHref?: Route;
    actionLabel?: string;
};

export function ErrorState({
    title = "Something went wrong.",
    description = "The mock query layer failed to return data for this view. Reload or move back to the leaderboard.",
    actionHref = "/",
    actionLabel = "Return to leaderboard",
}: ErrorStateProps) {
    return <EmptyState eyebrow="Error state" title={title} description={description} actionHref={actionHref} actionLabel={actionLabel} />;
}