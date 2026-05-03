-- CreateEnum
CREATE TYPE "CourseApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "course_applications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "type" "CourseRole" NOT NULL,
    "status" "CourseApplicationStatus" NOT NULL,

    CONSTRAINT "course_applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course_applications" ADD CONSTRAINT "course_applications_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
