/*
  Warnings:

  - The `application_state` column on the `staff_profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `application_state` column on the `student_profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `course_enrollements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `section_enrollements` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ApplicationState" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "course_enrollements" DROP CONSTRAINT "course_enrollements_course_id_fkey";

-- DropForeignKey
ALTER TABLE "course_enrollements" DROP CONSTRAINT "course_enrollements_role_id_fkey";

-- DropForeignKey
ALTER TABLE "course_enrollements" DROP CONSTRAINT "course_enrollements_user_id_fkey";

-- DropForeignKey
ALTER TABLE "section_enrollements" DROP CONSTRAINT "section_enrollements_role_id_fkey";

-- DropForeignKey
ALTER TABLE "section_enrollements" DROP CONSTRAINT "section_enrollements_section_id_fkey";

-- DropForeignKey
ALTER TABLE "section_enrollements" DROP CONSTRAINT "section_enrollements_user_id_fkey";

-- AlterTable
ALTER TABLE "staff_profiles" DROP COLUMN "application_state",
ADD COLUMN     "application_state" "ApplicationState" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "student_profiles" DROP COLUMN "application_state",
ADD COLUMN     "application_state" "ApplicationState" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "course_enrollements";

-- DropTable
DROP TABLE "section_enrollements";

-- CreateTable
CREATE TABLE "course_enrolments" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,

    CONSTRAINT "course_enrolments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_enrolments" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "section_id" UUID NOT NULL,

    CONSTRAINT "section_enrolments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course_enrolments" ADD CONSTRAINT "course_enrolments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_enrolments" ADD CONSTRAINT "course_enrolments_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_enrolments" ADD CONSTRAINT "course_enrolments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_enrolments" ADD CONSTRAINT "section_enrolments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_enrolments" ADD CONSTRAINT "section_enrolments_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_enrolments" ADD CONSTRAINT "section_enrolments_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
