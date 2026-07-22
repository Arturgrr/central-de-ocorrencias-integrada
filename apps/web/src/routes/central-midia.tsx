import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	Camera,
	FileText,
	Folder,
	HardDrive,
	Image as ImageIcon,
	Search,
	Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import AppShell from "@/components/app-shell";
import Pagination from "@/components/pagination";
import { useGetMediaSummary } from "@/gen/hooks/attachments/useGetMediaSummary";
import { useListMedia } from "@/gen/hooks/attachments/useListMedia";
import { requireRole } from "@/lib/auth-client";
import { attachmentKind, fileExtension, formatDate } from "@/lib/coi";

const PAGE_SIZE = 12;

const searchSchema = z.object({
	page: z.coerce.number().int().min(1).optional(),
	kind: z.enum(["image", "video", "document"]).optional(),
	search: z.string().optional(),
});

export const Route = createFileRoute("/central-midia")({
	beforeLoad: () => requireRole("admin", "attendant", "agent"),
	validateSearch: searchSchema,
	component: CentralMidiaScreen,
});

function CentralMidiaScreen() {
	const navigate = useNavigate({ from: "/central-midia" });
	const { page = 1, kind, search } = Route.useSearch();
	const [searchInput, setSearchInput] = useState(search ?? "");

	useEffect(() => {
		const timeout = setTimeout(() => {
			if ((search ?? "") === searchInput) return;
			navigate({
				search: (prev) => ({
					...prev,
					search: searchInput || undefined,
					page: undefined,
				}),
			});
		}, 400);

		return () => clearTimeout(timeout);
	}, [searchInput, search, navigate]);

	const summary = useGetMediaSummary();
	const media = useListMedia({
		params: { page, pageSize: PAGE_SIZE, kind, search },
	});

	const categories = [
		{
			value: undefined,
			label: "Todos os Arquivos",
			icon: Folder,
			count: summary.data?.total,
		},
		{
			value: "image" as const,
			label: "Fotografias",
			icon: ImageIcon,
			count: summary.data?.images,
		},
		{
			value: "video" as const,
			label: "Vídeos",
			icon: Video,
			count: summary.data?.videos,
		},
		{
			value: "document" as const,
			label: "Documentos & Laudos",
			icon: FileText,
			count: summary.data?.documents,
		},
	];

	return (
		<AppShell
			title="Central de Mídia e Evidências"
			actions={
				<div className="relative hidden md:block">
					<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
					<input
						type="text"
						value={searchInput}
						onChange={(event) => setSearchInput(event.target.value)}
						placeholder="Buscar por nome do arquivo..."
						className="w-64 rounded-lg border border-slate-800 bg-slate-950 p-2.5 pl-9 text-slate-200 text-sm outline-none transition-colors focus:border-emerald-500"
					/>
				</div>
			}
		>
			<div className="flex h-full gap-6 p-4 sm:p-8">
				<aside className="hidden w-64 shrink-0 flex-col gap-6 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 p-4 lg:flex">
					<div>
						<p className="mb-3 px-2 font-bold text-[10px] text-slate-500 uppercase tracking-wider">
							Categorias
						</p>
						<nav className="space-y-1">
							{categories.map((category) => {
								const active = kind === category.value;
								return (
									<button
										key={category.label}
										type="button"
										onClick={() =>
											navigate({
												search: (prev) => ({
													...prev,
													kind: category.value,
													page: undefined,
												}),
											})
										}
										className={`flex w-full items-center justify-between rounded-lg px-3 py-2 font-medium text-sm transition-colors ${
											active
												? "bg-emerald-500/10 text-emerald-500"
												: "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
										}`}
									>
										<span className="flex items-center gap-2">
											<category.icon className="h-4 w-4" /> {category.label}
										</span>
										<span className="text-xs">{category.count ?? "—"}</span>
									</button>
								);
							})}
						</nav>
					</div>

					<div className="mt-auto rounded-lg border border-slate-800 bg-slate-950 p-4">
						<div className="mb-2 flex items-center gap-2">
							<HardDrive className="h-4 w-4 text-emerald-500" />
							<p className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">
								Repositório
							</p>
						</div>
						<p className="font-mono text-slate-400 text-xs">
							{summary.data?.total ?? 0} arquivo(s) vinculado(s) a ocorrências
						</p>
					</div>
				</aside>

				<main className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
					<div className="flex-1 overflow-y-auto p-4 sm:p-6">
						<div className="mb-6 flex items-center justify-between">
							<h3 className="font-bold text-lg text-white">
								Adicionados Recentemente
							</h3>
							<span className="rounded-md border border-slate-800 bg-slate-950 px-3 py-1.5 font-bold text-slate-500 text-xs">
								{media.data?.total ?? 0} resultado(s)
							</span>
						</div>

						{media.isLoading && (
							<p className="text-slate-500 text-sm">Carregando evidências...</p>
						)}

						{!media.isLoading && media.data?.items.length === 0 && (
							<p className="text-slate-500 text-sm">
								Nenhum arquivo encontrado com os filtros atuais.
							</p>
						)}

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
							{media.data?.items.map((file) => (
								<MediaCard key={file.id} file={file} />
							))}
						</div>
					</div>

					<Pagination
						page={page}
						pageSize={PAGE_SIZE}
						total={media.data?.total ?? 0}
						onPageChange={(next) =>
							navigate({ search: (prev) => ({ ...prev, page: next }) })
						}
					/>
				</main>
			</div>
		</AppShell>
	);
}

function MediaCard({
	file,
}: {
	file: {
		id: string;
		occurrenceId: string;
		fileName: string;
		fileUrl: string;
		mimeType: string;
		createdAt: string;
		occurrenceProtocol: string;
	};
}) {
	const navigate = useNavigate();
	const kind = attachmentKind(file.mimeType);
	const Icon =
		kind === "video" ? Video : kind === "document" ? FileText : Camera;

	return (
		<div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 transition-colors hover:border-emerald-500/50">
			<a
				href={file.fileUrl}
				target="_blank"
				rel="noreferrer"
				className="relative flex h-32 items-center justify-center overflow-hidden bg-slate-800"
			>
				<div className="absolute inset-0 bg-gradient-to-tr from-slate-700 to-slate-600 opacity-50" />
				<Icon className="relative z-10 h-8 w-8 text-slate-300 opacity-70" />
				<span className="absolute bottom-2 left-2 rounded bg-slate-950/80 px-2 py-0.5 font-bold text-[9px] text-slate-300 uppercase tracking-wider backdrop-blur">
					{fileExtension(file.fileName) || kind}
				</span>
			</a>
			<div className="p-3">
				<p
					className="truncate pr-2 font-bold text-sm text-white"
					title={file.fileName}
				>
					{file.fileName}
				</p>
				<div className="mt-2 flex items-center justify-between">
					<p className="font-mono text-[10px] text-slate-500">
						{formatDate(file.createdAt)}
					</p>
					<button
						type="button"
						onClick={() =>
							navigate({
								to: "/detalhes-bo/$occurrenceId",
								params: { occurrenceId: file.occurrenceId },
							})
						}
						className="rounded border border-blue-500/20 bg-blue-500/10 px-1.5 py-0.5 font-bold text-[9px] text-blue-400 uppercase tracking-wider transition-colors hover:bg-blue-500/20"
					>
						{file.occurrenceProtocol}
					</button>
				</div>
			</div>
		</div>
	);
}
