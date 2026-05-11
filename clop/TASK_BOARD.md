# Task Board

Status legend:

- `[x]` Done in current codebase
- `[~]` Partially done / scaffolded
- `[ ]` Not started
- `[blocked]` Blocked by product, vendor, infra, or data decision

This board combines the business scope from `escopo-do-projeto.md` with the backend-first execution plan from `build-plan.md`.

## Current Snapshot

- `[x]` Backend scaffold exists: Hono, TypeScript, Zod, Vitest, env config.
- `[x]` Local API runs with in-memory seed data.
- `[x]` Core routes exist for cases, parties, properties, documents, timeline, pendencias, legal KB, dashboard, and agent sessions.
- `[~]` Supabase is adapter-ready for Storage, but Postgres/Auth are not wired yet.
- `[~]` AI agent works with deterministic local provider and OpenRouter adapter, but no production prompt/retrieval hardening yet.
- `[ ]` Frontend/dashboard UI does not exist yet.
- `[ ]` WhatsApp real provider integration does not exist yet.

## MVP: Cadastro E Organizacao Basica

- `[x]` Create/list/update cases/processes through API.
- `[x]` Register involved parties through API.
- `[x]` Register property/imovel through API.
- `[x]` Store matricula on property records.
- `[x]` Store CPF/CNPJ as party metadata.
- `[x]` Store document metadata linked to case, party, and property.
- `[~]` Upload workflow boundary through `/documents/upload-url`.
- `[ ]` Real file upload to Supabase Storage with configured project and bucket.
- `[ ]` Persistent document organization in Supabase Postgres.
- `[ ]` Frontend screens for case, party, property, and document registration.

## MVP: Gestao Operacional

- `[~]` Operational dashboard data API exists through `/dashboard/summary`.
- `[x]` Case stage/status fields exist.
- `[x]` List cases by API.
- `[x]` Timeline event API exists.
- `[x]` Operational notes are supported through timeline events and case description.
- `[x]` Pendencia creation and resolution API exists.
- `[~]` Consolidated pending view exists indirectly through case bundle and dashboard count.
- `[ ]` Dedicated filters/views by status, stage, assignee, or priority.
- `[ ]` Frontend operational dashboard.
- `[ ]` Frontend visual timeline.

## MVP: Juridico E Documentacao

- `[x]` Legal KB model supports rules, templates, checklists, and source records.
- `[x]` KB records have draft/published status.
- `[x]` KB records are versioned on update.
- `[x]` Only published KB items are used by the agent by default.
- `[~]` Basic pre-contract rules can be stored as KB `rule` records.
- `[~]` Simple document/parecer drafting exists through agent structured response and `draftText`.
- `[ ]` Dedicated document generation service from templates.
- `[ ]` Contract versioning entity separate from generic KB versioning.
- `[ ]` Standard parecer workflow with review/approval states.
- `[ ]` Legal backoffice UI for rule/template/checklist management.

## MVP: Copilot Operacional

- `[x]` Agent session API exists.
- `[x]` Agent message API exists.
- `[x]` Agent can be tied to a case.
- `[x]` Agent assembles context from case, parties, properties, documents, and open pendencias.
- `[x]` Agent cites case facts and KB references in structured output.
- `[x]` Agent identifies missing documents as risk flags in local deterministic provider.
- `[x]` Agent is constrained as assistive only and does not mutate legal status.
- `[~]` OpenRouter provider adapter exists.
- `[ ]` Production-grade prompts and JSON validation/retry handling for OpenRouter output.
- `[ ]` Retrieval over document text or embeddings.
- `[ ]` pgvector-backed semantic search.
- `[ ]` Conversation history retrieval beyond storing messages.
- `[ ]` Human-review workflow for generated drafts.

## MVP: Integracao WhatsApp

- `[~]` Agent session has `channel: "whatsapp"` as a bridge-ready marker.
- `[ ]` Provider decision: Twilio, Meta Cloud API, Z-API, or another vendor.
- `[ ]` Incoming webhook endpoint.
- `[ ]` Outgoing message sender.
- `[ ]` Phone number to internal user/case/session resolution.
- `[ ]` Message delivery status handling.
- `[ ]` Provider credentials and deployment configuration.

## MVP: Seguranca E Base Minima

- `[~]` Local authentication simulation through `x-user-id`.
- `[x]` Internal roles modeled: `operator`, `lawyer_admin`, `manager`.
- `[x]` Basic RBAC checks for case write, document write, KB write, dashboard read, and agent use.
- `[~]` Supabase Auth is planned but not enforced.
- `[~]` Supabase Storage adapter exists.
- `[ ]` Supabase JWT verification.
- `[ ]` Supabase Postgres persistence.
- `[ ]` Database migrations.
- `[ ]` Row-level security policy design.
- `[ ]` Audit log entity for relevant changes.
- `[ ]` LGPD-oriented retention/access policy.
- `[ ]` Production security middleware, rate limiting, and structured logging.

## MVP: Dashboard Gerencial Inicial

- `[x]` Total cases metric.
- `[x]` Cases by stage metric.
- `[x]` Cases by status metric.
- `[x]` Missing documents count.
- `[x]` Open pendencias count.
- `[x]` Basic productivity counters.
- `[~]` Basic SLA placeholder: active cases without open pending items.
- `[ ]` Pendencias by status breakdown.
- `[ ]` Documents missing by case/stage.
- `[ ]` Productivity by operator.
- `[ ]` Frontend management dashboard.

## Backend Build Plan: Public Interfaces

- `[x]` `GET /cases`
- `[x]` `POST /cases`
- `[x]` `GET /cases/:id`
- `[x]` `PATCH /cases/:id`
- `[x]` `POST /cases/:id/parties`
- `[x]` `POST /cases/:id/properties`
- `[x]` `POST /cases/:id/pending-items`
- `[x]` `PATCH /pending-items/:id/resolve`
- `[x]` `POST /cases/:id/timeline`
- `[x]` `POST /cases/:id/documents`
- `[x]` `POST /documents/upload-url`
- `[x]` `GET /legal-kb`
- `[x]` `POST /legal-kb`
- `[x]` `PATCH /legal-kb/:id`
- `[x]` `GET /dashboard/summary`
- `[x]` `POST /agent/sessions`
- `[x]` `POST /agent/sessions/:id/messages`
- `[x]` OpenAPI 3.1 spec served at `/openapi.json`.
- `[x]` Swagger UI served at `/docs`.
- `[ ]` Generated OpenAPI from route/Zod schemas to reduce manual drift.
- `[ ]` Pagination, filtering, and sorting conventions.
- `[ ]` Stable error catalog beyond current simple error shape.

## Backend Build Plan: Tests

- `[x]` API test: operator can create cases.
- `[x]` API test: manager cannot write cases.
- `[x]` API test: KB defaults to published-only.
- `[x]` API test: manager can read dashboard summary.
- `[x]` Agent test: cites case facts and published KB only.
- `[x]` Agent test: missing document risk flag.
- `[ ]` Unit tests for each service branch and validation edge cases.
- `[ ]` Integration tests against Supabase local or test project.
- `[ ]` Mocked OpenRouter test for provider adapter.
- `[ ]` Tests for malformed LLM JSON handling.
- `[ ]` Tests for upload URL behavior with Supabase mocked.

## Roadmap: Fase 1, Semanas 1 A 3

- `[x]` Base backend platform scaffold.
- `[~]` Basic auth/access model via local header and RBAC.
- `[x]` Case, party, property, and document APIs.
- `[~]` Upload API boundary.
- `[~]` Initial operational/dashboard metrics API.
- `[ ]` Real Supabase Auth/Postgres/Storage wiring.
- `[ ]` Frontend shell, if MVP expands beyond backend-first.

## Roadmap: Fase 2, Semanas 4 A 6

- `[x]` Basic timeline API.
- `[x]` Pendencias API and tracking.
- `[~]` Basic pre-contract rule storage through legal KB.
- `[~]` Standardized parecer draft through agent response.
- `[~]` Initial document generation through agent draft text only.
- `[~]` WhatsApp bridge-ready agent channel.
- `[~]` Initial management dashboard API.
- `[ ]` Real template-based document generation.
- `[ ]` Real WhatsApp integration.
- `[ ]` Human review flow for legal drafts.

## Roadmap: Fase 3, Semanas 7 A 12

- `[ ]` Mature operational workflow and richer status/stage transitions.
- `[ ]` More complete filters and operational views.
- `[ ]` Expanded legal rules and structured templates.
- `[ ]` Due diligence checklist workflow.
- `[ ]` Structured contract versioning.
- `[ ]` More useful contextual copilot with retrieval over documents and history.
- `[ ]` Complete management dashboard with SLA, bottlenecks, critical pendencias, and time by stage.
- `[ ]` More consistent audit trail.
- `[ ]` Refinement for continuous production use.

## Product Final: Estrutura Operacional Mais Madura

- `[ ]` Improved case creation flow.
- `[ ]` Improved case tracking flow.
- `[ ]` Richer timeline model and UI.
- `[ ]` Organization by context, stage, and pendencia.
- `[ ]` Operational filters and saved views.

## Product Final: Juridico, Contratos, Due Diligence

- `[~]` Legal KB foundation exists.
- `[ ]` Expanded pre-contract rules.
- `[ ]` Structured contract templates.
- `[ ]` Consistent document generation pipeline.
- `[ ]` Clear contract versioning and comparison.
- `[ ]` Stronger parecer standardization.
- `[ ]` Operational/legal checklist workflow.
- `[ ]` Document validation support.
- `[ ]` Consolidated due diligence verification summary.

## Product Final: Copilot, Dashboard, Governanca

- `[~]` Agent API foundation exists.
- `[ ]` Refined contextual retrieval.
- `[ ]` Navigation support across case and documents.
- `[ ]` Stage-aware operational suggestions.
- `[~]` Initial dashboard metrics exist.
- `[ ]` Executive dashboard view.
- `[ ]` SLA tracking.
- `[ ]` Critical pendencia tracking.
- `[ ]` Productivity by operator/team.
- `[ ]` Time-in-stage metrics.
- `[ ]` Bottleneck tracking.
- `[~]` Basic RBAC exists.
- `[ ]` Improved access profiles.
- `[ ]` Consistent audit trail.
- `[ ]` Secure document storage policies.
- `[ ]` LGPD preparation.

## Explicitly Out Of Scope For Now

- `[ ]` Advanced configurable rules engine.
- `[ ]` Complex third-party integrations beyond WhatsApp.
- `[ ]` Advanced OCR and document extraction.
- `[ ]` Complex financial automations.
- `[ ]` Multi-company tenancy with independent detailed rules.
- `[ ]` External BI/advanced analytics layer.
- `[ ]` Formal pentest and deep compliance program in this phase.
- `[ ]` Client/external party portal for v1.
- `[ ]` Automatic legal approval/rejection decisions.

## Immediate Next Recommended Tasks

- `[ ]` Add Supabase migrations for current domain model.
- `[ ]` Implement Supabase-backed repositories for cases, parties, properties, documents, timeline, pendencias, KB, and agent messages.
- `[ ]` Replace `x-user-id` local auth with Supabase JWT verification.
- `[ ]` Add audit log model and write audit entries for case/document/KB changes.
- `[x]` Add checked-in OpenAPI documentation served by the API.
- `[ ]` Add OpenAPI generation from route/Zod schemas later if manual maintenance becomes noisy.
- `[ ]` Harden OpenRouter provider with schema validation, retry, and fallback behavior.
- `[ ]` Add integration tests against Supabase local or a dedicated test project.
