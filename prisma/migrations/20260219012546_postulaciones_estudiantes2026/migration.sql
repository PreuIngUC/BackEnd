/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avg1M` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avg2M` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avg3M` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avg4M` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationalLevel` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electiveTest` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familySize` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goalsAndPlans` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyEducationExpenses` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyFoodExpenses` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyHealthcareExpenses` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyHousingExpenses` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyMiscExpenses` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyTelecomExpenses` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyTransportationExpenses` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyUtilitiesExpenses` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residence` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rshSection` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolDependency` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolType` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `takesM2` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetProgram` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetUniversity` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMonthlyIncome` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pronouns` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Pronouns" AS ENUM ('EL_LO', 'ELLA_LA', 'ELLE_LE');

-- CreateEnum
CREATE TYPE "EducationalLevel" AS ENUM ('PRIMERO_MEDIO', 'SEGUNDO_MEDIO', 'TERCERO_MEDIO', 'CUARTO_MEDIO', 'EGRESADO');

-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('CIENTIFICO_HUMANISTA', 'TECNICO_PROFESIONAL', 'ARTISTICO');

-- CreateEnum
CREATE TYPE "SchoolDependency" AS ENUM ('MUNICIPAL', 'SUBVENCIONADO_O_ADMINISTRACION_DELEGADA', 'PARTICULAR_PAGADO');

-- CreateEnum
CREATE TYPE "ElectiveTest" AS ENUM ('BIOLOGIA', 'FISICA', 'QUIMICA', 'HISTORIA', 'TECNICO');

-- CreateEnum
CREATE TYPE "TakesM2" AS ENUM ('SI', 'NO', 'AUN_NO_SE');

-- CreateEnum
CREATE TYPE "RSHSection" AS ENUM ('FROM_0_TO_40', 'FROM_41_TO_50', 'FROM_51_TO_60', 'FROM_61_TO_70', 'FROM_71_TO_80', 'FROM_81_TO_90', 'FROM_91_TO_100', 'DOESNT_HAVE');

-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN     "avg1M" DECIMAL(2,1) NOT NULL,
ADD COLUMN     "avg2M" DECIMAL(2,1) NOT NULL,
ADD COLUMN     "avg3M" DECIMAL(2,1) NOT NULL,
ADD COLUMN     "avg4M" DECIMAL(2,1) NOT NULL,
ADD COLUMN     "educationalLevel" "EducationalLevel" NOT NULL,
ADD COLUMN     "electiveTest" "ElectiveTest" NOT NULL,
ADD COLUMN     "familySize" INTEGER NOT NULL,
ADD COLUMN     "goalsAndPlans" TEXT NOT NULL,
ADD COLUMN     "monthlyEducationExpenses" INTEGER NOT NULL,
ADD COLUMN     "monthlyFoodExpenses" INTEGER NOT NULL,
ADD COLUMN     "monthlyHealthcareExpenses" INTEGER NOT NULL,
ADD COLUMN     "monthlyHousingExpenses" INTEGER NOT NULL,
ADD COLUMN     "monthlyMiscExpenses" INTEGER NOT NULL,
ADD COLUMN     "monthlyTelecomExpenses" INTEGER NOT NULL,
ADD COLUMN     "monthlyTransportationExpenses" INTEGER NOT NULL,
ADD COLUMN     "monthlyUtilitiesExpenses" INTEGER NOT NULL,
ADD COLUMN     "residence" TEXT NOT NULL,
ADD COLUMN     "rshSection" "RSHSection" NOT NULL,
ADD COLUMN     "scheduleDifficulties" TEXT,
ADD COLUMN     "school" TEXT NOT NULL,
ADD COLUMN     "schoolDependency" "SchoolDependency" NOT NULL,
ADD COLUMN     "schoolType" "SchoolType" NOT NULL,
ADD COLUMN     "takesM2" "TakesM2" NOT NULL,
ADD COLUMN     "targetProgram" TEXT NOT NULL,
ADD COLUMN     "targetUniversity" TEXT NOT NULL,
ADD COLUMN     "totalMonthlyIncome" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthDate" DATE NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "pronouns" "Pronouns" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");
