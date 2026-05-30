import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type StatCardProps = {
    title: string;
    value: string;
    helper: string;
    change?: string;
    trend?: "up" | "down" | "neutral";
};

export function StatCard({ title, value, helper, change, trend = "neutral" }: StatCardProps) {
    return (
        <article className="surface-panel p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">{title}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
                </div>
                {change ? (
                    <span
                        className={[
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                            trend === "up"
                                ? "bg-emerald-400/14 text-emerald-200"
                                : trend === "down"
                                    ? "bg-rose-400/14 text-rose-200"
                                    : "bg-white/8 text-slate-300",
                        ].join(" ")}
                    >
                        {trend === "up" ? <ArrowUpRight className="size-3.5" /> : null}
                        {trend === "down" ? <ArrowDownRight className="size-3.5" /> : null}
                        {change}
                    </span>
                ) : null}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">{helper}</p>
        </article>
    );
}