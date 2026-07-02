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
- React
- Vite

### Backend
- Node.js
- TypeScript

### Banco de Dados
- PostgreSQL

---

## 📖 Objetivo

O objetivo deste projeto é desenvolver uma aplicação web completa, integrando frontend e backend, com foco em boas práticas de desenvolvimento, organização de código e escalabilidade.

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

### 🚪 Módulo de Autenticação e Acesso
* **Tela de Login Institucional**
<img width="1363" height="689" alt="Captura de tela de 2026-07-01 22-42-45" src="https://github.com/user-attachments/assets/6f2eb337-b928-44a2-829f-243857bf1b5a" />

* **Tela de Cadastro (Perfis Dinâmicos de Cidadão / Agente)**
 <img width="1363" height="689" alt="Captura de tela de 2026-07-01 22-55-34" src="https://github.com/user-attachments/assets/c933406c-f426-468b-a5d5-072908af67ea" />


### 🚨 Visão Pública (Munícipe)
* **Portal de Proteção e Atendimento ao Cidadão**
<img width="1363" height="689" alt="Captura de tela de 2026-07-01 22-56-12" src="https://github.com/user-attachments/assets/b90fee12-766b-4d81-83ee-31750bda458a" />


### 🛡️ Operação e Despacho Tático (Central COI)
* **Dashboard Principal (Painel de Controle & Monitoramento)**
<img width="1363" height="689" alt="Captura de tela de 2026-07-01 22-56-52" src="https://github.com/user-attachments/assets/f6d2cde2-6550-428b-a8c0-e2340a452bc7" />

* **Novo Registro de Ocorrência (Formulário do Atendente)**
 <img width="1363" height="689" alt="Captura de tela de 2026-07-01 22-57-21" src="https://github.com/user-attachments/assets/745e8da3-c9ac-4a49-bbb8-395c116b7f42" />

* **Painel de Detalhes da Ocorrência (Linha do Tempo e Ações)**
<img width="1363" height="689" alt="Captura de tela de 2026-07-01 22-57-58" src="https://github.com/user-attachments/assets/271d2469-fdf9-4d6f-ac06-93ad625a72d7" />

### 🚓 Gestão de Recursos, Auditoria e Evidências
* **Controle de Viaturas & Agentes (Efetivo Operacional)**
<img width="1363" height="689" alt="Captura de tela de 2026-07-01 22-58-30" src="https://github.com/user-attachments/assets/3e03bd25-050f-4016-b940-de906b563542" />

* **Arquivo Geral de Ocorrências (Data Grid Administrativo com Filtros)**
<img width="1363" height="689" alt="Captura de tela de 2026-07-01 22-58-55" src="https://github.com/user-attachments/assets/77dc27f9-d27c-4e20-af33-482dc8373e8e" />

* **Central de Mídia e Evidências (Repositório de Arquivos Vinculados)**
 <img width="1363" height="689" alt="Captura de tela de 2026-07-01 22-59-26" src="https://github.com/user-attachments/assets/8b6dff98-a9fc-45fb-aee4-5bf5e2bd6411" />

---

## 🔒 Requisitos Não Funcionais & Segurança
* **Responsividade (Mobile-First):** Interface do Agente otimizada para uso em smartphones no campo, enquanto o painel do Atendente é focado em navigation desktop.
* **Segurança e LGPD:** Criptografia de senhas (Bcrypt) e proteção de rotas (JWT), garantindo a privacidade dos dados pessoais dos munícipes cadastrados.
* **Resiliência a Falhas (Offline-First para Agentes):** Capacidade de salvar laudos e fotos localmente no dispositivo do agente caso haja queda de internet em áreas de desastre, sincronizando automaticamente com o PostgreSQL quando a conexão for reestabelecida.

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
Os diagramas de atividades em especifico foram criados dentro da ferramenta de criacao de diagramas da plataforma Figma (Ferramenta figjam), onde o arquivo .fig em questao está em docs/diagrama_de_atividades.fig

<img width="383" height="446" alt="Captura de Tela 2026-07-01 às 23 24 48" src="https://github.com/user-attachments/assets/6caf6f54-c458-4c5b-b02e-d468c7d336c0" />
<img width="414" height="520" alt="Captura de Tela 2026-07-01 às 23 24 41" src="https://github.com/user-attachments/assets/eab4daa0-52e3-4248-abe5-a72242bdadce" />
<img width="418" height="474" alt="Captura de Tela 2026-07-01 às 23 24 36" src="https://github.com/user-attachments/assets/aa9bcb69-1564-4183-a6e1-920f5b515790" />
<img width="507" height="499" alt="Captura de Tela 2026-07-01 às 23 24 29" src="https://github.com/user-attachments/assets/a133bf7f-e86b-4919-b359-1f6cf1859ebd" />
<img width="435" height="629" alt="Captura de Tela 2026-07-01 às 23 24 25" src="https://github.com/user-attachments/assets/3cff6d28-d84a-4569-9c7c-7da8c0f2063f" />
<img width="613" height="727" alt="Captura de Tela 2026-07-01 às 23 24 18" src="https://github.com/user-attachments/assets/c8eba8c4-cb44-4348-a40a-8b99103b86cf" />
<img width="446" height="703" alt="Captura de Tela 2026-07-01 às 23 24 13" src="https://github.com/user-attachments/assets/e5836a64-03e0-4cf9-a4d8-4eaf01cc5e24" />
<img width="707" height="788" alt="Captura de Tela 2026-07-01 às 23 24 03" src="https://github.com/user-attachments/assets/8a6766ce-d309-4eb9-9d15-2f1790a18b63" />


