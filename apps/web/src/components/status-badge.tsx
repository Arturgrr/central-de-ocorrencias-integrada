import type { ReactNode } from "react";

export function StatusBadge({
	label,
	className,
	icon,
}: {
	label: string;
	className: string;
	icon?: ReactNode;
}) {
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-bold text-[10px] uppercase tracking-wider ${className}`}
		>
			{icon}
			{label}
		</span>
	);
}
