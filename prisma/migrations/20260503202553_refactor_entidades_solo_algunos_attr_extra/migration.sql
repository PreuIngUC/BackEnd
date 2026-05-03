/*
  Warnings:

  - You are about to drop the column `role_id` on the `course_enrolments` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `section_enrolments` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[student_number]` on the table `staff_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `course_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `course_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `course_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeBlock` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `section_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `section_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `section_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entry_year` to the `staff_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `program` to the `staff_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_number` to the `staff_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `staff_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseRole" AS ENUM ('COORDINATOR', 'TEACHER');

-- CreateEnum
CREATE TYPE "SectionRole" AS ENUM ('TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'JUSTIFIED');

-- DropForeignKey
ALTER TABLE "course_enrolments" DROP CONSTRAINT "course_enrolments_role_id_fkey";

-- DropForeignKey
ALTER TABLE "section_enrolments" DROP CONSTRAINT "section_enrolments_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_user_id_fkey";

-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "status" "AttendanceStatus" NOT NULL DEFAULT 'ABSENT',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "course_enrolments" DROP COLUMN "role_id",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "role" "CourseRole" NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "open_for_coordinators" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "open_for_teachers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "classroom" TEXT,
ADD COLUMN     "repetition" INTEGER NOT NULL DEFAULT 7,
ADD COLUMN     "timeBlock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "section_enrolments" DROP COLUMN "role_id",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "role" "SectionRole" NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sections" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "staff_profiles" ADD COLUMN     "entry_year" INTEGER NOT NULL,
ADD COLUMN     "program" TEXT NOT NULL,
ADD COLUMN     "student_number" TEXT NOT NULL,
ADD COLUMN     "university" TEXT NOT NULL;

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "user_roles";

-- CreateTable
CREATE TABLE "event_tokens" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "time_stamp" INTEGER NOT NULL,

    CONSTRAINT "event_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_profiles_student_number_key" ON "staff_profiles"("student_number");

-- AddForeignKey
ALTER TABLE "event_tokens" ADD CONSTRAINT "event_tokens_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
