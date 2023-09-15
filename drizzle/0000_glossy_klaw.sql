CREATE TABLE IF NOT EXISTS "contact_requests" (
	"id" serial NOT NULL,
	"contactPerson" text,
	"companyName" text,
	"email" text,
	"phone" text,
	"message" text,
	"read_at" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
