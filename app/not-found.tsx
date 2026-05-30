import Link from "next/link";

export default function NotFound() {
    return (
        <div className="surface-panel-strong flex min-h-[60vh] flex-col items-center justify-center gap-6 px-8 py-20 text-center">
            <span className="pill-chip">Trader Not Found</span>
            <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-white">No profile matches that route.</h1>
                <p className="max-w-xl text-sm leading-7 text-slate-300">
                    The profile may have been removed from the mocked dataset or the route was typed incorrectly.
                </p>
            </div>
            <Link
                href="/"
                className="rounded-full border border-cyan-400/40 bg-cyan-400/14 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-300/18"
            >
                Back to leaderboard
            </Link>
        </div>
    );
}