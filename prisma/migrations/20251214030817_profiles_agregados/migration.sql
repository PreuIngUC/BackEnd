-- CreateTable
CREATE TABLE "staff_profile" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "application_state" TEXT NOT NULL,

    CONSTRAINT "staff_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_profile" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "application_state" TEXT NOT NULL,

    CONSTRAINT "student_profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "staff_profile" ADD CONSTRAINT "staff_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profile" ADD CONSTRAINT "student_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
