/*
  Warnings:

  - You are about to drop the column `role_id` on the `course_enrolments` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `section_enrolments` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `course_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_room` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `section_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entry_year` to the `staff_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `program` to the `staff_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `staff_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `staff_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StaffApplicationsRole" AS ENUM ('COORDINATOR', 'TEACHER');

-- CreateEnum
CREATE TYPE "CourseEnrolmentRole" AS ENUM ('COORDINATOR', 'TEACHER');

-- CreateEnum
CREATE TYPE "SectionEnrolmentRole" AS ENUM ('TEACHER', 'STUDENT');

-- DropForeignKey
ALTER TABLE "course_enrolments" DROP CONSTRAINT "course_enrolments_role_id_fkey";

-- DropForeignKey
ALTER TABLE "section_enrolments" DROP CONSTRAINT "section_enrolments_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_user_id_fkey";

-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "course_enrolments" DROP COLUMN "role_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "CourseEnrolmentRole" NOT NULL;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" DATE NOT NULL,
ADD COLUMN     "start_date" DATE NOT NULL;

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "class_room" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "section_enrolments" DROP COLUMN "role_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "SectionEnrolmentRole" NOT NULL;

-- AlterTable
ALTER TABLE "sections" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "staff_profiles" ADD COLUMN     "entry_year" INTEGER NOT NULL,
ADD COLUMN     "program" TEXT NOT NULL,
ADD COLUMN     "role" "StaffApplicationsRole" NOT NULL,
ADD COLUMN     "university" TEXT NOT NULL;

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "user_roles";
