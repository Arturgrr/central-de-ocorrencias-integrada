CREATE TYPE "public"."role" AS ENUM('admin', 'attendant', 'agent', 'citizen');--> statement-breakpoint
CREATE TYPE "public"."assignment_status" AS ENUM('assigned', 'accepted', 'arrived', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."occurrence_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."occurrence_status" AS ENUM('open', 'dispatched', 'in_progress', 'resolved', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."timeline_event_type" AS ENUM('created', 'status_changed', 'vehicle_dispatched', 'agent_update', 'closed');--> statement-breakpoint
CREATE TYPE "public"."vehicle_status" AS ENUM('available', 'dispatched', 'maintenance', 'inactive');--> statement-breakpoint
CREATE SEQUENCE "public"."occurrence_protocol_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"role" "role" DEFAULT 'citizen' NOT NULL,
	"registration_number" text,
	"phone" text,
	"address" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "occurrence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"protocol" text NOT NULL,
	"citizen_id" uuid,
	"type_id" uuid NOT NULL,
	"opened_by_user_id" text NOT NULL,
	"closed_by_user_id" text,
	"status" "occurrence_status" DEFAULT 'open' NOT NULL,
	"priority" "occurrence_priority" DEFAULT 'medium' NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"address_line" text NOT NULL,
	"city_id" uuid,
	"neighborhood_id" uuid,
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"opened_at" timestamp DEFAULT now() NOT NULL,
	"closed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "occurrence_protocol_unique" UNIQUE("protocol")
);
--> statement-breakpoint
CREATE TABLE "occurrence_assignment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"occurrence_id" uuid NOT NULL,
	"vehicle_id" uuid,
	"agent_user_id" text,
	"assigned_by_user_id" text NOT NULL,
	"status" "assignment_status" DEFAULT 'assigned' NOT NULL,
	"assigned_at" timestamp DEFAULT now() NOT NULL,
	"accepted_at" timestamp,
	"arrived_at" timestamp,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "occurrence_timeline_event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"occurrence_id" uuid NOT NULL,
	"created_by_user_id" text,
	"type" timeline_event_type NOT NULL,
	"description" text NOT NULL,
	"metadata" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "citizen" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"document" text,
	"address_line" text,
	"neighborhood" text,
	"city" text,
	"state" text,
	"postal_code" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "city" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"state" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "neighborhood" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"city_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "occurrence_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"priority" integer DEFAULT 3 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "occurrence_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "vehicle" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"plate" text NOT NULL,
	"model" text,
	"status" "vehicle_status" DEFAULT 'available' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vehicle_code_unique" UNIQUE("code"),
	CONSTRAINT "vehicle_plate_unique" UNIQUE("plate")
);
--> statement-breakpoint
CREATE TABLE "vehicle_location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"latitude" numeric(10, 7) NOT NULL,
	"longitude" numeric(10, 7) NOT NULL,
	"reported_by_user_id" text,
	"recorded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_citizen_id_citizen_id_fk" FOREIGN KEY ("citizen_id") REFERENCES "public"."citizen"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_type_id_occurrence_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."occurrence_type"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_opened_by_user_id_user_id_fk" FOREIGN KEY ("opened_by_user_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_closed_by_user_id_user_id_fk" FOREIGN KEY ("closed_by_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_neighborhood_id_neighborhood_id_fk" FOREIGN KEY ("neighborhood_id") REFERENCES "public"."neighborhood"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence_assignment" ADD CONSTRAINT "occurrence_assignment_occurrence_id_occurrence_id_fk" FOREIGN KEY ("occurrence_id") REFERENCES "public"."occurrence"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence_assignment" ADD CONSTRAINT "occurrence_assignment_vehicle_id_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence_assignment" ADD CONSTRAINT "occurrence_assignment_agent_user_id_user_id_fk" FOREIGN KEY ("agent_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence_assignment" ADD CONSTRAINT "occurrence_assignment_assigned_by_user_id_user_id_fk" FOREIGN KEY ("assigned_by_user_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence_timeline_event" ADD CONSTRAINT "occurrence_timeline_event_occurrence_id_occurrence_id_fk" FOREIGN KEY ("occurrence_id") REFERENCES "public"."occurrence"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occurrence_timeline_event" ADD CONSTRAINT "occurrence_timeline_event_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborhood" ADD CONSTRAINT "neighborhood_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_location" ADD CONSTRAINT "vehicle_location_vehicle_id_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_location" ADD CONSTRAINT "vehicle_location_reported_by_user_id_user_id_fk" FOREIGN KEY ("reported_by_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "occurrence_status_idx" ON "occurrence" USING btree ("status");--> statement-breakpoint
CREATE INDEX "occurrence_type_idx" ON "occurrence" USING btree ("type_id");--> statement-breakpoint
CREATE INDEX "occurrence_citizen_idx" ON "occurrence" USING btree ("citizen_id");--> statement-breakpoint
CREATE INDEX "assignment_occurrence_idx" ON "occurrence_assignment" USING btree ("occurrence_id");--> statement-breakpoint
CREATE INDEX "timeline_occurrence_idx" ON "occurrence_timeline_event" USING btree ("occurrence_id");--> statement-breakpoint
CREATE INDEX "citizen_phone_idx" ON "citizen" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "occurrence_type_active_idx" ON "occurrence_type" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "vehicle_status_idx" ON "vehicle" USING btree ("status");--> statement-breakpoint
CREATE INDEX "vehicle_location_vehicle_idx" ON "vehicle_location" USING btree ("vehicle_id");