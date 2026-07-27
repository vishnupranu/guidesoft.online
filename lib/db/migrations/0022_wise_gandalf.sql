CREATE TABLE "contacts" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL DEFAULT '',
  "email" text NOT NULL,
  "subject" text,
  "message" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
);