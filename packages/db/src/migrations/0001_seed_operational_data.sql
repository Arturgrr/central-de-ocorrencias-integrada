-- Dados iniciais para o sistema ficar operável logo após a criação do schema:
-- um administrador e os catálogos sem os quais nenhuma ocorrência pode ser
-- aberta (tipos, localidades e frota).
--
-- Todos os comandos são idempotentes.

INSERT INTO "user" ("id", "name", "email", "email_verified", "role", "created_at", "updated_at")
VALUES (
  'seed_admin_arturgrr',
  'Artur Assis Guerra',
  'arturassisguerra@gmail.com',
  true,
  'admin',
  now(),
  now()
)
ON CONFLICT ("email") DO NOTHING;
--> statement-breakpoint

INSERT INTO "account" ("id", "account_id", "provider_id", "user_id", "password", "created_at", "updated_at")
SELECT
  'seed_account_arturgrr',
  u."id",
  'credential',
  u."id",
  '1eb8b82e9d6e051be94f133ed32f4660:70f8b24afdfcfffa14fee1c808776157dc8ad8bd0a74b48b834e66f28b13f4f24cab5838098453987322ba05c24a85e7a05347b70f7e94aa7cb4bea9a60be82e',
  now(),
  now()
FROM "user" u
WHERE u."email" = 'arturassisguerra@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM "account" a
    WHERE a."user_id" = u."id" AND a."provider_id" = 'credential'
  );
--> statement-breakpoint

INSERT INTO "occurrence_type" ("name", "description", "priority") VALUES
  ('Deslizamento de Terra',  'Movimentação de massa em encostas e taludes',      1),
  ('Inundação / Alagamento', 'Acúmulo de água em vias e residências',            2),
  ('Queda de Árvore',        'Árvore caída ou com risco iminente de queda',      3),
  ('Acidente de Trânsito',   'Colisão ou capotamento com necessidade de apoio',  2),
  ('Vistoria Estrutural',    'Avaliação técnica de edificação com risco',        4)
ON CONFLICT ("name") DO NOTHING;
--> statement-breakpoint

INSERT INTO "city" ("name", "state")
SELECT 'João Monlevade', 'MG'
WHERE NOT EXISTS (SELECT 1 FROM "city" WHERE "name" = 'João Monlevade');
--> statement-breakpoint

INSERT INTO "neighborhood" ("city_id", "name")
SELECT c."id", b."name"
FROM "city" c
CROSS JOIN (VALUES
  ('República'),
  ('Cruzeiro Celeste'),
  ('Centro'),
  ('Carneirinhos')
) AS b("name")
WHERE c."name" = 'João Monlevade'
  AND NOT EXISTS (
    SELECT 1 FROM "neighborhood" n
    WHERE n."city_id" = c."id" AND n."name" = b."name"
  );
--> statement-breakpoint

INSERT INTO "vehicle" ("code", "plate", "model", "status") VALUES
  ('VTR-42', 'RMT9G34', 'Mitsubishi L200 (Branca)', 'available'),
  ('VTR-15', 'QWY2B11', 'Renault Duster (Preta)',   'available'),
  ('VTR-08', 'PXK4D77', 'Ford Ranger (Branca)',     'available')
ON CONFLICT ("code") DO NOTHING;
