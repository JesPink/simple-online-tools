type LoadingSkeletonProps = {
    rows?: number;
};

export function LoadingSkeleton({ rows = 5 }: LoadingSkeletonProps) {
    return (
        <div className="surface-panel p-5">
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, index) => (
                    <div key={index} className="h-14 animate-pulse rounded-2xl bg-white/6" />
                ))}
            </div>
        </div>
    );
}