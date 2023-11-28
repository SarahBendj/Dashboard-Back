-- Deploy cuisto:3.identificant_column to pg

BEGIN;

    ALTER TABLE "app_user"
   ADD COLUMN "identificant" text;

    
COMMIT;
