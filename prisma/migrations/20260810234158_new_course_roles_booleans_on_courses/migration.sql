-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "open_for_designers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "open_for_developers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "open_for_directors" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "open_for_managers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "open_for_volunteers" BOOLEAN NOT NULL DEFAULT false;
