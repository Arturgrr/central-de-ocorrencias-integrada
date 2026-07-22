# 📌 Projeto
 
## 📝 Sobre o Projeto

A **Central de Ocorrência Integrada (COI)** é um sistema web full-stack desenvolvido especificamente para modernizar as operações táticas e administrativas da Defesa Civil. 

* **Funcionalidade:** O sistema atua como o centro de comando digital da corporação. Ele centraliza a recepção de chamados dos munícipes, permite o despacho georreferenciado de viaturas no mapa e possibilita o acompanhamento em tempo real das equipes de campo. Através da plataforma, agentes e atendentes podem registrar dados, anexar evidências fotográficas in loco e gerar uma linha do tempo completa e auditável de cada atendimento.
* **Finalidade:** O grande objetivo do sistema é substituir métodos de registro manuais, físicos e descentralizados (como pranchetas, rádios analógicos e planilhas isoladas) por uma fonte única de verdade. A COI foi projetada para reduzir drasticamente o tempo de resposta a emergências, garantir a integridade dos dados durante situações de crise e otimizar o direcionamento de recursos públicos onde eles são mais necessários.

---

## 👥 Equipe

- **Artur Assis Guerra** — Full Stack Developer  
- **Eduardo Christianini Fonseca Junior** — Full Stack Developer e Product Owner
- **Vanderson Guimarães da Silva** — Back end Developer  
- **Ícaro Lopes dos Santos Santana** — Front end Developer  

---

## 🚀 Tecnologias Utilizadas

### Frontend
- React 19 + Vite
- TanStack Router (roteamento com guardas por perfil) e TanStack Query (cache de dados)
- Tailwind CSS

### Backend
- Node.js + TypeScript
- Fastify com validação Zod ponta a ponta (`fastify-type-provider-zod`)
- better-auth (sessão por cookie httpOnly, senha com hash e controle de perfis)
- Drizzle ORM

### Contrato de API
- **OpenAPI 3.0** gerado a partir dos schemas Zod das rotas
- **Kubb** gerando o SDK do frontend: tipos TypeScript, validadores Zod e hooks do TanStack Query

### Banco de Dados
- PostgreSQL

### Infraestrutura
- Docker multi-stage + docker compose (Postgres, migrações, API e frontend)

---

## 📖 Objetivo

O objetivo deste projeto é desenvolver uma aplicação web completa, integrando frontend e backend, com foco em boas práticas de desenvolvimento, organização de código e escalabilidade.

---

## 🧱 Arquitetura

O repositório é um monorepo pnpm + Turborepo:

```
apps/
  server/   API Fastify (rotas, controllers e repositórios)
  web/      SPA React (telas + SDK gerado em src/gen)
packages/
  db/       schema Drizzle e conexão com o Postgres
  auth/     configuração do better-auth
  env/      validação das variáveis de ambiente (servidor e web)
  ui/       componentes compartilhados
docker/     nginx + entrypoint de configuração em runtime do frontend
```

### O contrato de API é a fonte da verdade

O frontend não escreve chamadas HTTP à mão. O fluxo é:

```
schemas Zod das rotas  →  apps/server/openapi.json  →  Kubb  →  apps/web/src/gen
   (fastify)                (OpenAPI 3.0)                       (tipos + zod + hooks)
```

1. Cada rota do Fastify declara `body`, `querystring`, `params` e `response` com Zod.
2. Os schemas de entidade são registrados com `.meta({ id })`, o que os publica em
   `components/schemas` do OpenAPI — assim `Occurrence`, `Vehicle`, `Citizen` etc.
   viram um único tipo reutilizável em vez de estruturas duplicadas.
3. `pnpm generate:api` serializa o documento e roda o Kubb.
4. As telas consomem hooks tipados (`useListOccurrences`, `useCreateOccurrence`, …)
   que validam a resposta com Zod em tempo de execução.

Consequência prática: **mudou o backend, o frontend para de compilar** até ser
ajustado. Não existe divergência silenciosa entre cliente e servidor.

> ⚠️ Tudo em `apps/web/src/gen` é gerado. Não edite manualmente — rode `pnpm generate:api`.

A documentação interativa da API fica em `http://localhost:3000/docs` (Scalar).

---

## ▶️ Como Executar

### Opção 1 — Docker (recomendado para a apresentação)

```bash
cp .env.example .env      # ajuste as URLs e o segredo, se necessário
docker compose up -d --build

# popula o banco com dados de demonstração
docker compose run --rm migrate pnpm --filter server db:seed
```

- Frontend: `http://localhost:3001`
- API: `http://localhost:3000`
- Documentação da API: `http://localhost:3000/docs`

Todas as URLs e credenciais vêm de variáveis de ambiente (`.env`). A URL da API
usada pelo navegador é injetada **em tempo de execução** no container do
frontend, então apontar o sistema para outro domínio é só trocar
`VITE_SERVER_URL` e reiniciar — sem rebuild da imagem.

### Opção 2 — Desenvolvimento local

```bash
pnpm install
cp .env.example apps/server/.env   # ajuste DATABASE_URL para localhost

pnpm db:start     # sobe o Postgres via docker
pnpm db:push      # aplica o schema
pnpm db:seed      # dados de demonstração
pnpm dev          # API em :3000 e web em :3001
```

Depois de alterar qualquer rota ou schema do backend:

```bash
pnpm generate:api   # regenera o openapi.json e o SDK do frontend
```

### Credenciais de demonstração (criadas pelo seed)

| E-mail | Senha | Perfil |
|---|---|---|
| `admin@coi.gov.br` | `admin12345` | Administrador |
| `atendente@coi.gov.br` | `atendente123` | Atendente |
| `oliveira@coi.gov.br` | `agente12345` | Agente |
| `cidadao@exemplo.com` | `cidadao12345` | Cidadão |

---
## 🧑‍💻 Atores e Autenticação
O sistema conta com um módulo de Autenticação e Controle de Acesso (Login), garantindo que cada usuário acesse apenas as ferramentas do seu cargo.

* **Atendente (Base):** Autentica-se no painel da central. Realiza o primeiro contato, cadastra os dados do cidadão, categoriza o evento, define a localização no mapa e despacha a viatura.
* **Agente de Defesa Civil (Campo):** Autentica-se na interface de campo. Recebe o chamado, roteiriza o atendimento, enriquece a ocorrência com dados in loco (upload de fotos) e encerra o chamado.

## ⚙️ Funcionalidades Principais

* **Autenticação Segura:** Sistema de login individual para Atendentes e Agentes, com proteção de rotas e rastreabilidade de ações.
* **Cadastro de Munícipes:** Registro de dados do cidadão solicitante (nome, telefone, endereço, histórico de chamados).
* **Integração com Mapa (Geolocalização):** Visualização do local exato da ocorrência através de mapas interativos e visualização da distribuição de viaturas na cidade.
* **Gestão de Ocorrências e Acompanhamento:** Abertura, delegação de viaturas, encerramento de chamados e uma timeline cronológica do que acontece na ocorrência.
* **Enriquecimento Multimídia:** Upload e armazenamento de fotografias atreladas aos chamados para laudos técnicos visuais.
* **Gestão de Recursos:** Administração de Viaturas, Funcionários e Tipos de Ocorrência com integridade referencial nativa no banco de dados.
* **Dashboard Operacional:** Visualização clara do fluxo de trabalho para identificar rapidamente ocorrências pendentes e equipes em operação.

---

## 🖼️ Protótipos das Interfaces (UI/UX)

Abaixo estão listadas as telas desenvolvidas para a validação do escopo do sistema. Para renderizar os prints no GitHub, salve as imagens na pasta correspondente dentro do seu projeto (ex: `apps/web/public/assets/screenshots/` ou na raiz em `assets/screenshots/`) com os mesmos nomes indicados nos campos abaixo.

https://www.figma.com/design/upMswzOSzyzCrZGXgbhubx/COI---Central-de-Ocorrencias-Integrada---Eng.-Software-1?node-id=4-10&p=f&t=dU7tr8aIsryo2BFo-0

### 🚪 Módulo de Autenticação e Acesso
* **Tela de Login Institucional**
<img width="903" height="580" alt="Captura de Tela 2026-07-22 às 13 53 01" src="https://github.com/user-attachments/assets/90003ae8-e0be-4e17-8549-64f26dedd9c4" />

* **Tela de Cadastro (Perfis Dinâmicos de Cidadão / Agente)**
<img width="900" height="582" alt="Captura de Tela 2026-07-22 às 13 53 17" src="https://github.com/user-attachments/assets/0c19dcba-b7a9-4605-bac0-96a0129051e3" />


### 🚨 Visão Pública (Munícipe)
* **Portal de Proteção e Atendimento ao Cidadão**
<img width="840" height="550" alt="Captura de Tela 2026-07-22 às 13 53 37" src="https://github.com/user-attachments/assets/279ff3ac-c3aa-4de1-aa9c-ea5b36baf32e" />


### 🛡️ Operação e Despacho Tático (Central COI)
* **Dashboard Principal (Painel de Controle & Monitoramento)**
<img width="736" height="480" alt="Captura de Tela 2026-07-22 às 13 54 20" src="https://github.com/user-attachments/assets/db0bbbcc-18a5-4e1c-9509-0f90e903e8dd" />

* **Novo Registro de Ocorrência (Formulário do Atendente)**
<img width="744" height="485" alt="Captura de Tela 2026-07-22 às 13 54 33" src="https://github.com/user-attachments/assets/b1a35c77-86c6-4996-babd-ed30d3f72b6c" />

* **Painel de Detalhes da Ocorrência (Linha do Tempo e Ações)**
<img width="727" height="475" alt="Captura de Tela 2026-07-22 às 13 54 46" src="https://github.com/user-attachments/assets/4c26c200-175b-4f84-8566-a201abcf0e9a" />

### 🚓 Gestão de Recursos, Auditoria e Evidências
* **Controle de Viaturas & Agentes (Efetivo Operacional)**
<img width="771" height="506" alt="Captura de Tela 2026-07-22 às 13 55 01" src="https://github.com/user-attachments/assets/5f5ae5f6-a16d-4147-8f86-7a9d134df142" />

* **Arquivo Geral de Ocorrências (Data Grid Administrativo com Filtros)**
<img width="765" height="509" alt="Captura de Tela 2026-07-22 às 13 55 14" src="https://github.com/user-attachments/assets/c7607260-a34f-42c6-aa9a-3a8beedd85e8" />

---

## 🔒 Requisitos Não Funcionais & Segurança
* **Responsividade (Mobile-First):** Interface do Agente otimizada para uso em smartphones no campo, enquanto o painel do Atendente é focado em navigation desktop.
* **Segurança e LGPD:** Criptografia de senhas (Bcrypt) e proteção de rotas (JWT), garantindo a privacidade dos dados pessoais dos munícipes cadastrados.
* **Contrato de API Tipado:** A API expõe um documento OpenAPI 3.1 gerado a partir dos schemas Zod do backend, e o frontend consome esse contrato através de código gerado pelo **Kubb** (tipos TypeScript, validadores Zod e hooks TanStack Query), eliminando divergência entre cliente e servidor.

## 📱 Notificações e Mensageria
* **Alertas de Status:** Atualizações no painel para que os Atendentes saibam instantaneamente quando um Agente chega ao local ou finaliza uma ocorrência.

## 🛠️ Ferramentas de Engenharia & Gestão
* **Metodologia Ágil:** Gestão de tarefas, Sprints e Backlog conduzidas através de metodologias ágeis (Scrum/Kanban).
* **Prototipagem (UI/UX):** Telas e fluxos de navegação desenhados no Figma antes do desenvolvimento.

<br>
<br>

# 📚 Backlog do Produto — COI

| Ordem | Nome do Épico | Prioridade | Objetivo |
|---|---|---|---|
| 1 | Autenticação e Controle de Acesso | Alta | Garantir segurança, autenticação dos usuários e controle de permissões no sistema. |
| 2 | Gestão de Ocorrências | Alta | Centralizar o fluxo operacional de abertura, acompanhamento e encerramento de ocorrências. |
| 3 | Geolocalização e Gestão de Viaturas | Alta | Permitir monitoramento em tempo real das equipes e despacho estratégico de viaturas. |

<br>
<br>

# 🚨 Sprint Backlog — COI

## 🛡️ SPRINT 1 — Autenticação e Controle de Acesso

| User Story | Tipo | Prioridade |
|---|---|---|
| Como usuário eu gostaria de me autenticar no sistema para acessar minhas funcionalidades de acordo com meu perfil | Backend | Alta |
| Como administrador eu gostaria de gerenciar usuários para controlar permissões de acesso | Backend | Alta |
| Como sistema eu gostaria de proteger rotas para impedir acessos não autorizados | Full Stack | Alta |
| Como usuário eu gostaria de criar uma conta no sistema para poder acessar a plataforma | Backend | Alta |
| Como sistema eu gostaria de aplicar controle de roles para separar permissões entre atendente, agente e administrador | Backend | Alta |

<br>

## 🛡️ SPRINT 2 — Gestão de Ocorrências

| User Story | Tipo | Prioridade |
|---|---|---|
| Como atendente eu gostaria de registrar uma ocorrência para iniciar um atendimento emergencial | Backend | Alta |
| Como atendente eu gostaria de visualizar ocorrências para acompanhar chamados ativos | Backend | Alta |
| Como agente eu gostaria de atualizar o status da ocorrência para informar o andamento do atendimento | Backend | Alta |
| Como agente eu gostaria de encerrar uma ocorrência para finalizar o atendimento | Backend | Alta |
| Como sistema eu gostaria de armazenar ocorrências no banco de dados para manter histórico | Backend | Alta |
| Como atendente eu gostaria de visualizar lista de ocorrências para acompanhamento operacional | Frontend | Alta |
| Como usuário eu gostaria de acompanhar a atualização de status em tempo real para monitorar o atendimento | Frontend | Alta |

<br>

## 🛡️ SPRINT 3 — Geolocalização e Gestão de Viaturas

| User Story | Tipo | Prioridade |
|---|---|---|
| Como atendente eu gostaria de marcar a localização da ocorrência para registrar o ponto exato do incidente | Frontend | Alta |
| Como administrador eu gostaria de cadastrar viaturas para gerenciar recursos operacionais | Backend | Alta |
| Como sistema eu gostaria de armazenar dados de viaturas no banco para controle operacional | Backend | Alta |
| Como atendente eu gostaria de despachar viaturas para ocorrências para iniciar o atendimento | Backend | Alta |
| Como atendente eu gostaria de visualizar viaturas ativas no mapa para acompanhar operações | Frontend | Média |
| Como agente eu gostaria de compartilhar minha localização para permitir rastreamento em tempo real | Full Stack | Alta |
| Como sistema eu gostaria de atualizar localização dos agentes para monitoramento operacional | Full Stack | Alta |

---

## 🧩 Diagrama de Casos de Uso

Abaixo está o diagrama de casos de uso da **Central de Ocorrência Integrada (COI)**, representando os principais atores e funcionalidades do sistema.

<img src="https://github.com/user-attachments/assets/0e858c64-ea9e-4b50-942f-bbe932cc73ca" alt="Diagrama de Casos de Uso da Central de Ocorrência Integrada" width="900">

> **Figura 1:** Diagrama de Casos de Uso da COI


---

## 🧩 Diagrama de Classes

Abaixo está o diagrama de classes da **Central de Ocorrência Integrada (COI)**.

<img width="1322" height="682" alt="WhatsApp Image 2026-06-20 at 16 33 50" src="https://github.com/user-attachments/assets/1763f5cc-d950-474b-abc1-bc71b8ce4769" />

---

## 🧩 Diagrama de Atividades

Abaixo está as prints dos diagramas de atividades da **Central de Ocorrência Integrada (COI)**.
Os diagramas de atividades em especifico foram criados dentro da ferramenta de criacao de diagramas da plataforma Figma (Ferramenta figjam), onde o arquivo .fig em questao está em docs/diagrama_de_atividades.jam

<img width="383" height="446" alt="Captura de Tela 2026-07-01 às 23 24 48" src="https://github.com/user-attachments/assets/6caf6f54-c458-4c5b-b02e-d468c7d336c0" />
<img width="414" height="520" alt="Captura de Tela 2026-07-01 às 23 24 41" src="https://github.com/user-attachments/assets/eab4daa0-52e3-4248-abe5-a72242bdadce" />
<img width="418" height="474" alt="Captura de Tela 2026-07-01 às 23 24 36" src="https://github.com/user-attachments/assets/aa9bcb69-1564-4183-a6e1-920f5b515790" />
<img width="507" height="499" alt="Captura de Tela 2026-07-01 às 23 24 29" src="https://github.com/user-attachments/assets/a133bf7f-e86b-4919-b359-1f6cf1859ebd" />
<img width="435" height="629" alt="Captura de Tela 2026-07-01 às 23 24 25" src="https://github.com/user-attachments/assets/3cff6d28-d84a-4569-9c7c-7da8c0f2063f" />
<img width="613" height="727" alt="Captura de Tela 2026-07-01 às 23 24 18" src="https://github.com/user-attachments/assets/c8eba8c4-cb44-4348-a40a-8b99103b86cf" />
<img width="446" height="703" alt="Captura de Tela 2026-07-01 às 23 24 13" src="https://github.com/user-attachments/assets/e5836a64-03e0-4cf9-a4d8-4eaf01cc5e24" />
<img width="707" height="788" alt="Captura de Tela 2026-07-01 às 23 24 03" src="https://github.com/user-attachments/assets/8a6766ce-d309-4eb9-9d15-2f1790a18b63" />
