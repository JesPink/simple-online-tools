type TraderAvatarProps = {
    name: string;
    size?: "sm" | "md" | "lg";
};

const sizeClasses = {
    sm: "size-9 text-xs",
    md: "size-11 text-sm",
    lg: "size-14 text-lg",
};

export function TraderAvatar({ name, size = "md" }: TraderAvatarProps) {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            className={[
                "inline-flex items-center justify-center rounded-2xl border border-cyan-300/14 bg-gradient-to-br from-cyan-400/20 via-slate-800 to-emerald-400/18 font-semibold text-cyan-50",
                sizeClasses[size],
            ].join(" ")}
        >
            {initials}
        </div>
    );
}