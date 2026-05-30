"use client";

import { X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/components/providers/marketplace-provider";
import { createCopyDraft, marketFilterOptions } from "@/lib/mock-data";
import type { CopyFormValues } from "@/lib/types";

type CopyConfigFormProps = {
    initialValues: CopyFormValues;
};

function CopyConfigForm({ initialValues }: CopyConfigFormProps) {
    const { closeCopyConfigurator, copyModal, saveCopyConfiguration, walletBalance } = useMarketplace();
    const trader = copyModal.trader!;
    const [formValues, setFormValues] = useState<CopyFormValues>(initialValues);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const updateField = <K extends keyof CopyFormValues>(key: K, value: CopyFormValues[K]) => {
        setFormValues((current) => ({ ...current, [key]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        const result = saveCopyConfiguration(formValues);
        if (!result.ok) {
            setError(result.message ?? "Unable to save mock copy settings.");
            setIsSaving(false);
            return;
        }

        setIsSaving(false);
    };

    return (
        <div className="px-6 py-8 md:px-8 md:py-9">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <span className="pill-chip">{copyModal.mode === "edit" ? "Update copy" : "Start copying"}</span>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">{trader.name}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                        Configure how this follower mirrors position sizing, total exposure, and sport filters before the dashboard begins tracking the relationship.
                    </p>
                </div>
                <div className="rounded-3xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-300">
                    Wallet balance: <span className="font-semibold text-white">{walletBalance.toLocaleString()} USDC</span>
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.92fr]">
                <div className="space-y-5">
                    <label className="block space-y-2 text-sm text-slate-300">
                        <span className="font-medium text-white">Capital to allocate</span>
                        <input
                            type="number"
                            min={100}
                            max={walletBalance}
                            value={formValues.allocatedCapital}
                            onChange={(event) => updateField("allocatedCapital", Number(event.target.value))}
                            className="h-12 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-white outline-none"
                        />
                    </label>

                    <div className="space-y-3 text-sm text-slate-300">
                        <span className="font-medium text-white">Position sizing</span>
                        <div className="grid gap-3 md:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => updateField("sizingMode", "fixed")}
                                className={[
                                    "rounded-3xl border p-4 text-left transition",
                                    formValues.sizingMode === "fixed" ? "border-cyan-300/25 bg-cyan-400/10" : "border-white/8 bg-white/4",
                                ].join(" ")}
                            >
                                <p className="font-medium text-white">Fixed per trade</p>
                                <p className="mt-2 text-xs leading-6 text-slate-400">Allocate a consistent USDC amount to each mirrored trade.</p>
                            </button>
                            <button
                                type="button"
                                onClick={() => updateField("sizingMode", "proportional")}
                                className={[
                                    "rounded-3xl border p-4 text-left transition",
                                    formValues.sizingMode === "proportional" ? "border-cyan-300/25 bg-cyan-400/10" : "border-white/8 bg-white/4",
                                ].join(" ")}
                            >
                                <p className="font-medium text-white">Proportional to trader size</p>
                                <p className="mt-2 text-xs leading-6 text-slate-400">Follow the trader with a bounded percentage multiplier.</p>
                            </button>
                        </div>
                    </div>

                    {formValues.sizingMode === "fixed" ? (
                        <label className="block space-y-2 text-sm text-slate-300">
                            <span className="font-medium text-white">Fixed amount per trade</span>
                            <input
                                type="number"
                                min={25}
                                value={formValues.fixedAmount}
                                onChange={(event) => updateField("fixedAmount", Number(event.target.value))}
                                className="h-12 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-white outline-none"
                            />
                        </label>
                    ) : (
                        <label className="block space-y-3 text-sm text-slate-300">
                            <span className="font-medium text-white">Trader sizing percentage</span>
                            <input
                                type="range"
                                min={10}
                                max={100}
                                step={5}
                                value={formValues.proportionalPercentage}
                                onChange={(event) => updateField("proportionalPercentage", Number(event.target.value))}
                                className="w-full accent-cyan-300"
                            />
                            <span className="text-cyan-100">{formValues.proportionalPercentage}% of trader size</span>
                        </label>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="block space-y-2 text-sm text-slate-300">
                            <span className="font-medium text-white">Max total exposure</span>
                            <input
                                type="number"
                                min={100}
                                value={formValues.maxTotalExposure}
                                onChange={(event) => updateField("maxTotalExposure", Number(event.target.value))}
                                className="h-12 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-white outline-none"
                            />
                        </label>
                        <label className="block space-y-2 text-sm text-slate-300">
                            <span className="font-medium text-white">Max drawdown stop</span>
                            <input
                                type="number"
                                min={5}
                                max={80}
                                value={formValues.maxDrawdownStop}
                                onChange={(event) => updateField("maxDrawdownStop", Number(event.target.value))}
                                className="h-12 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-white outline-none"
                            />
                        </label>
                    </div>

                    <div className="space-y-3 text-sm text-slate-300">
                        <span className="font-medium text-white">Market filters</span>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {marketFilterOptions.map((filter) => {
                                const checked = formValues.marketFilters.includes(filter);
                                return (
                                    <label key={filter} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={(event) => {
                                                updateField(
                                                    "marketFilters",
                                                    event.target.checked
                                                        ? [...formValues.marketFilters, filter]
                                                        : formValues.marketFilters.filter((entry) => entry !== filter),
                                                );
                                            }}
                                            className="size-4 rounded border-white/10 bg-transparent accent-cyan-300"
                                        />
                                        {filter}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm text-slate-300">
                        <input
                            type="checkbox"
                            checked={formValues.agreeToTerms}
                            onChange={(event) => updateField("agreeToTerms", event.target.checked)}
                            className="mt-1 size-4 rounded border-white/10 bg-transparent accent-cyan-300"
                        />
                        <span>
                            I understand this is a non-custodial copy relationship mock. Future execution will require explicit permissions and cannot withdraw funds.
                        </span>
                    </label>
                </div>

                <div className="space-y-4">
                    <div className="rounded-[1.75rem] border border-cyan-300/12 bg-cyan-400/8 p-5">
                        <p className="text-xs font-semibold tracking-[0.16em] text-cyan-100 uppercase">Fee summary</p>
                        <p className="mt-3 text-2xl font-semibold text-white">{trader.feeModel.label}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-300">
                            This pricing summary is mocked now, but intentionally modeled so future billing and subscription logic can replace it without changing the follower flow.
                        </p>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/8 bg-white/4 p-5 text-sm text-slate-300">
                        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Configuration summary</p>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <span>Allocated capital</span>
                                <span className="font-semibold text-white">{formValues.allocatedCapital.toLocaleString()} USDC</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span>Sizing mode</span>
                                <span className="font-semibold text-white">{formValues.sizingMode === "fixed" ? "Fixed" : "Proportional"}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span>Exposure cap</span>
                                <span className="font-semibold text-white">{formValues.maxTotalExposure.toLocaleString()} USDC</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span>Drawdown stop</span>
                                <span className="font-semibold text-white">{formValues.maxDrawdownStop}%</span>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <span>Filters</span>
                                <span className="text-right font-semibold text-white">
                                    {formValues.marketFilters.length > 0 ? formValues.marketFilters.join(", ") : "All markets"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {error ? <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</div> : null}

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button onClick={handleSave} disabled={isSaving} className="h-11 flex-1 rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                            {isSaving ? "Saving..." : copyModal.mode === "edit" ? "Update Copy Settings" : "Start Copying"}
                        </Button>
                        <Button variant="outline" onClick={closeCopyConfigurator} className="h-11 rounded-full border-white/10 bg-transparent text-slate-200">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CopyConfigModal() {
    const { copyModal, closeCopyConfigurator, getRelationship, isConnected, openCopyConfigurator, toggleConnection } = useMarketplace();

    const existing = copyModal.trader ? getRelationship(copyModal.trader.id) : null;
    const initialValues = useMemo(
        () => (copyModal.trader ? createCopyDraft(copyModal.trader, existing) : null),
        [copyModal.trader, existing],
    );

    if (!copyModal.isOpen) {
        return null;
    }

    const trader = copyModal.trader;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/72 p-0 backdrop-blur-sm md:items-center md:p-6">
            <div className="surface-panel-strong relative w-full max-w-3xl overflow-hidden rounded-t-[2rem] border-white/10 bg-slate-950 md:rounded-[2rem]">
                <button
                    type="button"
                    aria-label="Close modal"
                    onClick={closeCopyConfigurator}
                    className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
                >
                    <X className="size-4" />
                </button>

                {!isConnected ? (
                    <div className="grid gap-8 px-6 py-8 md:grid-cols-[1fr_0.92fr] md:px-8 md:py-9">
                        <div className="space-y-4">
                            <span className="pill-chip">Wallet onboarding</span>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-semibold tracking-tight text-white">
                                    {trader ? `Connect to start copying ${trader.name}` : "Connect your wallet to start copying traders"}
                                </h2>
                                <p className="text-sm leading-7 text-slate-300">
                                    This prototype keeps wallet state mocked, but the onboarding flow is treated as a real trust gate: non-custodial,
                                    no withdrawal rights, and explicit user permission before any mirrored execution exists.
                                </p>
                            </div>
                            <div className="grid gap-3">
                                {[
                                    "Non-custodial: the product can only trade with your permission, never withdraw.",
                                    "Risk controls stay follower-owned with exposure and drawdown caps.",
                                    "Mocked wallet balance and address let test users experience the full UI flow before integration.",
                                ].map((line) => (
                                    <div key={line} className="rounded-3xl border border-white/8 bg-white/4 p-4 text-sm leading-7 text-slate-300">
                                        {line}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] border border-cyan-300/12 bg-cyan-400/8 p-5">
                            <p className="text-xs font-semibold tracking-[0.16em] text-cyan-100 uppercase">Mock connect</p>
                            <div className="mt-4 space-y-3 text-sm text-slate-300">
                                <p>Address and 12,450 USDC balance appear in the shell once connected.</p>
                                <p>After connection, this modal continues directly into copy configuration.</p>
                            </div>
                            <div className="mt-6 flex flex-col gap-3">
                                <Button
                                    onClick={() => {
                                        toggleConnection();
                                        if (trader) {
                                            openCopyConfigurator(trader.id, copyModal.source);
                                        }
                                    }}
                                    className="h-11 rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                                >
                                    Connect Mock Wallet
                                </Button>
                                <Button variant="outline" onClick={closeCopyConfigurator} className="h-11 rounded-full border-white/10 bg-transparent text-slate-200">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : !trader ? (
                    <div className="grid gap-8 px-6 py-8 md:grid-cols-[1fr_0.92fr] md:px-8 md:py-9">
                        <div className="space-y-4">
                            <span className="pill-chip">Wallet ready</span>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-semibold tracking-tight text-white">Your mock wallet is connected.</h2>
                                <p className="text-sm leading-7 text-slate-300">
                                    Browse the leaderboard to pick a trader, then open the copy configuration flow from the table, profile, or dashboard. The onboarding step is complete and the follower workflow is unlocked.
                                </p>
                            </div>
                            <div className="grid gap-3">
                                {[
                                    "Discovery stays available before and after connection so test users can inspect traders first.",
                                    "Copy settings, dashboard positions, and alerts now update from a shared follower-state owner.",
                                    "This route is intentionally neutral so a future real wallet provider can replace only the connection logic.",
                                ].map((line) => (
                                    <div key={line} className="rounded-3xl border border-white/8 bg-white/4 p-4 text-sm leading-7 text-slate-300">
                                        {line}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] border border-cyan-300/12 bg-cyan-400/8 p-5">
                            <p className="text-xs font-semibold tracking-[0.16em] text-cyan-100 uppercase">Next step</p>
                            <p className="mt-4 text-2xl font-semibold text-white">Choose a trader to configure copy rules.</p>
                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                Open the leaderboard to compare win rate, P&amp;L, and capital under copy, then return here through any Start Copying action.
                            </p>
                            <div className="mt-6 flex flex-col gap-3">
                                <Button onClick={closeCopyConfigurator} className="h-11 rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                                    Continue to leaderboard
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : trader && initialValues ? (
                    <CopyConfigForm key={`${trader.id}-${copyModal.mode}`} initialValues={initialValues} />
                ) : null}
            </div>
        </div>
    );
}