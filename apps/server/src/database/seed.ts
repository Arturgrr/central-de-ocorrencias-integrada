import { auth } from "@eng-soft1/auth";
import { eq } from "@eng-soft1/db";
import {
	citizen,
	city,
	neighborhood,
	occurrence,
	occurrenceAssignment,
	occurrenceTimelineEvent,
	occurrenceType,
	user,
	vehicle,
} from "@eng-soft1/db/schema";
import db from "./database-service";
import { OccurrenceRepository } from "./repositories/occurrence-repository";

type Role = "admin" | "attendant" | "agent" | "citizen";

async function upsertUser(input: {
	name: string;
	email: string;
	password: string;
	role: Role;
	phone?: string;
	registrationNumber?: string;
}) {
	const existing = await db
		.select({ id: user.id })
		.from(user)
		.where(eq(user.email, input.email));

	if (!existing[0]) {
		await auth.api.signUpEmail({
			body: {
				name: input.name,
				email: input.email,
				password: input.password,
				phone: input.phone,
				registrationNumber: input.registrationNumber,
			},
		});
	}

	const [row] = await db
		.update(user)
		.set({
			role: input.role,
			phone: input.phone,
			registrationNumber: input.registrationNumber,
			emailVerified: true,
		})
		.where(eq(user.email, input.email))
		.returning({ id: user.id });

	if (!row) throw new Error(`Failed to seed user ${input.email}`);
	return row.id;
}

async function main() {
	console.log("→ Limpando dados operacionais...");
	await db.delete(occurrenceTimelineEvent);
	await db.delete(occurrenceAssignment);
	await db.delete(occurrence);
	await db.delete(citizen);
	await db.delete(vehicle);
	await db.delete(neighborhood);
	await db.delete(city);
	await db.delete(occurrenceType);

	console.log("→ Criando usuários...");
	const adminId = await upsertUser({
		name: "Administrador COI",
		email: "admin@coi.gov.br",
		password: "admin12345",
		role: "admin",
		registrationNumber: "00001-A",
	});
	const attendantId = await upsertUser({
		name: "Operador 04",
		email: "atendente@coi.gov.br",
		password: "atendente123",
		role: "attendant",
		registrationNumber: "04127-C",
	});
	const agentOliveiraId = await upsertUser({
		name: "Sgt. Oliveira",
		email: "oliveira@coi.gov.br",
		password: "agente12345",
		role: "agent",
		registrationNumber: "14253-A",
	});
	const agentSilvaId = await upsertUser({
		name: "Ag. Silva",
		email: "silva@coi.gov.br",
		password: "agente12345",
		role: "agent",
		registrationNumber: "88912-B",
	});
	await upsertUser({
		name: "João da Silva",
		email: "cidadao@exemplo.com",
		password: "cidadao12345",
		role: "citizen",
		phone: "(31) 91234-5678",
	});

	console.log("→ Criando cidades e bairros...");
	const [monlevade] = await db
		.insert(city)
		.values({ name: "João Monlevade", state: "MG" })
		.returning();
	if (!monlevade) throw new Error("Failed to seed city");

	const bairros = await db
		.insert(neighborhood)
		.values([
			{ cityId: monlevade.id, name: "República" },
			{ cityId: monlevade.id, name: "Cruzeiro Celeste" },
			{ cityId: monlevade.id, name: "Centro" },
			{ cityId: monlevade.id, name: "Carneirinhos" },
		])
		.returning();

	console.log("→ Criando tipos de ocorrência...");
	const tipos = await db
		.insert(occurrenceType)
		.values([
			{
				name: "Deslizamento de Terra",
				description: "Movimentação de massa em encostas e taludes",
				priority: 1,
			},
			{
				name: "Inundação / Alagamento",
				description: "Acúmulo de água em vias e residências",
				priority: 2,
			},
			{
				name: "Queda de Árvore",
				description: "Árvore caída ou com risco iminente de queda",
				priority: 3,
			},
			{
				name: "Acidente de Trânsito",
				description: "Colisão ou capotamento com necessidade de apoio",
				priority: 2,
			},
			{
				name: "Vistoria Estrutural",
				description: "Avaliação técnica de edificação com risco",
				priority: 4,
			},
		])
		.returning();

	console.log("→ Criando viaturas...");
	const viaturas = await db
		.insert(vehicle)
		.values([
			{
				code: "VTR-42",
				plate: "RMT9G34",
				model: "Mitsubishi L200 (Branca)",
				status: "dispatched",
			},
			{
				code: "VTR-15",
				plate: "QWY2B11",
				model: "Renault Duster (Preta)",
				status: "available",
			},
			{
				code: "VTR-08",
				plate: "PXK4D77",
				model: "Ford Ranger (Branca)",
				status: "available",
			},
			{
				code: "VTR-03",
				plate: "LMN1A22",
				model: "Toyota Hilux (Prata)",
				status: "maintenance",
			},
		])
		.returning();

	console.log("→ Criando munícipes...");
	const municipes = await db
		.insert(citizen)
		.values([
			{
				name: "Maria Aparecida",
				phone: "(31) 91234-5678",
				document: "123.456.789-00",
				addressLine: "Rua das Pedras, 142",
				neighborhood: "República",
				city: "João Monlevade",
				state: "MG",
				postalCode: "35930-000",
			},
			{
				name: "João da Silva",
				phone: "(31) 98888-1111",
				document: "987.654.321-00",
				addressLine: "Rua das Acácias, 142",
				neighborhood: "República",
				city: "João Monlevade",
				state: "MG",
				postalCode: "35930-010",
			},
			{
				name: "Carlos Eduardo",
				phone: "(31) 97777-2222",
				addressLine: "Av. Principal, Km 12",
				neighborhood: "Centro",
				city: "João Monlevade",
				state: "MG",
			},
		])
		.returning();

	console.log("→ Criando ocorrências...");
	const repo = new OccurrenceRepository();

	async function nextProtocol() {
		const seq = await repo.nextProtocolNumber();
		return `COI-${new Date().getFullYear()}-${String(seq).padStart(5, "0")}`;
	}

	const [deslizamento] = await db
		.insert(occurrence)
		.values({
			protocol: await nextProtocol(),
			citizenId: municipes[0]?.id,
			typeId: tipos[0]?.id ?? "",
			openedByUserId: attendantId,
			status: "in_progress",
			priority: "critical",
			title: "Deslizamento de Terra",
			description:
				"Moradora relata que parte do barranco cedeu durante a madrugada. Há uma árvore de grande porte escorada no muro da residência, com risco iminente de queda sobre o teto.",
			addressLine: "Rua das Pedras, 142 - Encosta Norte, Setor 4",
			cityId: monlevade.id,
			neighborhoodId: bairros[0]?.id,
			latitude: "-19.8261000",
			longitude: "-43.1739000",
		})
		.returning();

	const [alagamento] = await db
		.insert(occurrence)
		.values({
			protocol: await nextProtocol(),
			citizenId: municipes[1]?.id,
			typeId: tipos[1]?.id ?? "",
			openedByUserId: attendantId,
			closedByUserId: agentOliveiraId,
			status: "resolved",
			priority: "medium",
			title: "Alagamento de Via Pública",
			description: "Bueiro entupido causando acúmulo de água na via.",
			addressLine: "Rua das Acácias, 142",
			cityId: monlevade.id,
			neighborhoodId: bairros[1]?.id,
			closedAt: new Date(),
			latitude: "-19.8290000",
			longitude: "-43.1710000",
		})
		.returning();

	const [acidente] = await db
		.insert(occurrence)
		.values({
			protocol: await nextProtocol(),
			citizenId: municipes[2]?.id,
			typeId: tipos[3]?.id ?? "",
			openedByUserId: attendantId,
			status: "dispatched",
			priority: "high",
			title: "Acidente de Trânsito",
			description: "Colisão entre dois veículos, sem vítimas presas.",
			addressLine: "Av. Principal, Km 12",
			cityId: monlevade.id,
			neighborhoodId: bairros[2]?.id,
			latitude: "-19.8305000",
			longitude: "-43.1688000",
		})
		.returning();

	await db.insert(occurrence).values({
		protocol: await nextProtocol(),
		typeId: tipos[2]?.id ?? "",
		openedByUserId: attendantId,
		status: "open",
		priority: "low",
		title: "Queda de Árvore no Muro",
		description: "Árvore de médio porte apoiada sobre o muro do vizinho.",
		addressLine: "Rua Sete de Setembro, 88",
		cityId: monlevade.id,
		neighborhoodId: bairros[3]?.id,
	});

	if (!deslizamento || !alagamento || !acidente) {
		throw new Error("Failed to seed occurrences");
	}

	console.log("→ Criando despachos e timeline...");
	await db.insert(occurrenceAssignment).values([
		{
			occurrenceId: deslizamento.id,
			vehicleId: viaturas[0]?.id,
			agentUserId: agentOliveiraId,
			assignedByUserId: attendantId,
			status: "arrived",
			acceptedAt: new Date(),
			arrivedAt: new Date(),
		},
		{
			occurrenceId: acidente.id,
			vehicleId: viaturas[1]?.id,
			agentUserId: agentSilvaId,
			assignedByUserId: attendantId,
			status: "assigned",
		},
	]);

	await db.insert(occurrenceTimelineEvent).values([
		{
			occurrenceId: deslizamento.id,
			createdByUserId: attendantId,
			type: "created",
			description: "Operador 04 registrou o B.O. via central telefônica.",
		},
		{
			occurrenceId: deslizamento.id,
			createdByUserId: attendantId,
			type: "vehicle_dispatched",
			description: "VTR-42 despachada para o local sob código 3.",
		},
		{
			occurrenceId: deslizamento.id,
			createdByUserId: agentOliveiraId,
			type: "agent_update",
			description: "Equipe no local, iniciando isolamento da área.",
		},
		{
			occurrenceId: alagamento.id,
			createdByUserId: attendantId,
			type: "created",
			description: "Chamado aberto pelo munícipe.",
		},
		{
			occurrenceId: alagamento.id,
			createdByUserId: agentOliveiraId,
			type: "closed",
			description: "Desobstrução concluída, via liberada.",
		},
	]);

	console.log("\n✅ Seed concluído.\n");
	console.log("Credenciais de acesso:");
	console.log("  admin@coi.gov.br      / admin12345      (admin)");
	console.log("  atendente@coi.gov.br  / atendente123    (atendente)");
	console.log("  oliveira@coi.gov.br   / agente12345     (agente)");
	console.log("  silva@coi.gov.br      / agente12345     (agente)");
	console.log("  cidadao@exemplo.com   / cidadao12345    (cidadão)");
	console.log(`\nAdmin id: ${adminId}`);

	process.exit(0);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
