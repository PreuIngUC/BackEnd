-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CourseRole" ADD VALUE 'EDITOR';
ALTER TYPE "CourseRole" ADD VALUE 'MONITOR';

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "open_for_editors" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "open_for_monitors" BOOLEAN NOT NULL DEFAULT false;
