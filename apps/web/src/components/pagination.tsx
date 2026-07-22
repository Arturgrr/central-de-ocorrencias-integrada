import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
	page: number;
	pageSize: number;
	total: number;
	onPageChange: (page: number) => void;
};

export default function Pagination({
	page,
	pageSize,
	total,
	onPageChange,
}: PaginationProps) {
	const lastPage = Math.max(1, Math.ceil(total / pageSize));
	const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
	const last = Math.min(page * pageSize, total);

	return (
		<div className="flex items-center justify-between border-slate-800 border-t bg-slate-900/50 p-4 text-slate-400 text-sm">
			<div>
				Mostrando <span className="font-bold text-white">{first}</span> a{" "}
				<span className="font-bold text-white">{last}</span> de{" "}
				<span className="font-bold text-white">{total}</span> registros
			</div>
			<div className="flex items-center gap-2">
				<span className="text-slate-500 text-xs">
					Página {page} de {lastPage}
				</span>
				<button
					type="button"
					onClick={() => onPageChange(page - 1)}
					disabled={page <= 1}
					className="rounded border border-slate-800 bg-slate-950 p-1.5 transition-colors hover:text-white disabled:opacity-50"
					aria-label="Página anterior"
				>
					<ChevronLeft className="h-4 w-4" />
				</button>
				<button
					type="button"
					onClick={() => onPageChange(page + 1)}
					disabled={page >= lastPage}
					className="rounded border border-slate-800 bg-slate-950 p-1.5 transition-colors hover:text-white disabled:opacity-50"
					aria-label="Próxima página"
				>
					<ChevronRight className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
