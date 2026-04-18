/*
  Warnings:

  - Added the required column `end_date` to the `course_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `course_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `section_enrolments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `section_enrolments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course_enrolments" ADD COLUMN     "end_date" DATE NOT NULL,
ADD COLUMN     "start_date" DATE NOT NULL;

-- AlterTable
ALTER TABLE "section_enrolments" ADD COLUMN     "end_date" DATE NOT NULL,
ADD COLUMN     "start_date" DATE NOT NULL;
