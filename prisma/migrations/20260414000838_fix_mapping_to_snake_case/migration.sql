-- AlterTable creation_jobs
ALTER TABLE "creation_jobs" RENAME COLUMN "createdAt" TO "created_at";

-- AlterTable student_profiles
ALTER TABLE "student_profiles" RENAME COLUMN "avg1M" TO "avg_1m";
ALTER TABLE "student_profiles" RENAME COLUMN "avg2M" TO "avg_2m";
ALTER TABLE "student_profiles" RENAME COLUMN "avg3M" TO "avg_3m";
ALTER TABLE "student_profiles" RENAME COLUMN "avg4M" TO "avg_4m";
ALTER TABLE "student_profiles" RENAME COLUMN "educationalLevel" TO "educational_level";
ALTER TABLE "student_profiles" RENAME COLUMN "electiveTest" TO "elective_test";
ALTER TABLE "student_profiles" RENAME COLUMN "familySize" TO "family_size";
ALTER TABLE "student_profiles" RENAME COLUMN "goalsAndPlans" TO "goals_and_plans";
ALTER TABLE "student_profiles" RENAME COLUMN "monthlyEducationExpenses" TO "monthly_education_expenses";
ALTER TABLE "student_profiles" RENAME COLUMN "monthlyFoodExpenses" TO "monthly_food_expenses";
ALTER TABLE "student_profiles" RENAME COLUMN "monthlyHealthcareExpenses" TO "monthly_healthcare_expenses";
ALTER TABLE "student_profiles" RENAME COLUMN "monthlyHousingExpenses" TO "monthly_housing_expenses";
ALTER TABLE "student_profiles" RENAME COLUMN "monthlyMiscExpenses" TO "monthly_misc_expenses";
ALTER TABLE "student_profiles" RENAME COLUMN "monthlyTelecomExpenses" TO "monthly_telecom_expenses";
ALTER TABLE "student_profiles" RENAME COLUMN "monthlyTransportationExpenses" TO "monthly_transportation_expenses";
ALTER TABLE "student_profiles" RENAME COLUMN "monthlyUtilitiesExpenses" TO "monthly_utilities_expenses";
ALTER TABLE "student_profiles" RENAME COLUMN "rshSection" TO "rsh_section";
ALTER TABLE "student_profiles" RENAME COLUMN "scheduleDifficulties" TO "schedule_difficulties";
ALTER TABLE "student_profiles" RENAME COLUMN "schoolDependency" TO "school_dependency";
ALTER TABLE "student_profiles" RENAME COLUMN "schoolType" TO "school_type";
ALTER TABLE "student_profiles" RENAME COLUMN "takesM2" TO "takes_m2";
ALTER TABLE "student_profiles" RENAME COLUMN "targetProgram" TO "target_program";
ALTER TABLE "student_profiles" RENAME COLUMN "targetUniversity" TO "target_university";
ALTER TABLE "student_profiles" RENAME COLUMN "totalMonthlyIncome" TO "total_monthly_income";

-- AlterTable users
ALTER TABLE "users" RENAME COLUMN "birthDate" TO "birth_date";
ALTER TABLE "users" RENAME COLUMN "phoneNumber" TO "phone_number";

-- RenameIndex
ALTER INDEX "users_phoneNumber_key" RENAME TO "users_phone_number_key";