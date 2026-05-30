import type { Route } from "next";
import Link from "next/link";

type EmptyStateProps = {
    eyebrow: string;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: Route;
};

export function EmptyState({ actionHref, actionLabel, description, eyebrow, title }: EmptyStateProps) {
    return (
        <div className="surface-panel-strong flex min-h-[18rem] flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <span className="pill-chip">{eyebrow}</span>
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
                <p className="max-w-xl text-sm leading-7 text-slate-300">{description}</p>
            </div>
            {actionHref && actionLabel ? (
                <Link
                    href={actionHref}
                    className="rounded-full border border-cyan-300/20 bg-cyan-400/14 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/18"
                >
                    {actionLabel}
                </Link>
            ) : null}
        </div>
    );
}