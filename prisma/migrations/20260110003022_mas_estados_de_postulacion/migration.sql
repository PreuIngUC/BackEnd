/*
  Warnings:

  - The values [REJECTED] on the enum `ApplicationState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationState_new" AS ENUM ('PENDING_AS_STUDENT', 'PENDING_AS_STAFF', 'ACCEPTED_AS_STUDENT', 'ACCEPTED_AS_STAFF', 'CREATED', 'REJECTED_AS_STAFF', 'REJECTED_AS_STUDENT', 'ACTIVE');
ALTER TABLE "public"."staff_profiles" ALTER COLUMN "application_state" DROP DEFAULT;
ALTER TABLE "public"."student_profiles" ALTER COLUMN "application_state" DROP DEFAULT;
ALTER TABLE "staff_profiles" ALTER COLUMN "application_state" TYPE "ApplicationState_new" USING ("application_state"::text::"ApplicationState_new");
ALTER TABLE "student_profiles" ALTER COLUMN "application_state" TYPE "ApplicationState_new" USING ("application_state"::text::"ApplicationState_new");
ALTER TYPE "ApplicationState" RENAME TO "ApplicationState_old";
ALTER TYPE "ApplicationState_new" RENAME TO "ApplicationState";
DROP TYPE "public"."ApplicationState_old";
ALTER TABLE "staff_profiles" ALTER COLUMN "application_state" SET DEFAULT 'PENDING_AS_STAFF';
ALTER TABLE "student_profiles" ALTER COLUMN "application_state" SET DEFAULT 'PENDING_AS_STUDENT';
COMMIT;
