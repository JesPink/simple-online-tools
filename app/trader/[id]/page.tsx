import { notFound } from "next/navigation";

import { TraderProfileView } from "@/components/trader/trader-profile-view";
import { getTraderById, leaderboardTraders } from "@/lib/mock-data";

export const dynamicParams = false;

export function generateStaticParams() {
    return leaderboardTraders.map((trader) => ({ id: trader.id }));
}

type TraderPageProps = {
    params: Promise<{ id: string }>;
};

export default async function TraderPage({ params }: TraderPageProps) {
    const { id } = await params;

    if (!getTraderById(id)) {
        notFound();
    }

    return <TraderProfileView traderId={id} />;
}