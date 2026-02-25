-- CreateEnum
CREATE TYPE "CreationJobTarget" AS ENUM ('STUDENTS', 'STAFF');

-- CreateEnum
CREATE TYPE "CreationJobStatus" AS ENUM ('PENDING', 'RUNNING', 'DONE', 'DONE_WITH_ERRORS');

-- CreateTable
CREATE TABLE "creation_jobs" (
    "id" UUID NOT NULL,
    "creator_id" UUID NOT NULL,
    "target" "CreationJobTarget" NOT NULL,
    "status" "CreationJobStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creation_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creation_job_items" (
    "id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "status" "CreationJobStatus" NOT NULL,
    "target" "CreationJobTarget" NOT NULL,
    "error" TEXT,

    CONSTRAINT "creation_job_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "creation_job_items_job_id_user_id_target_key" ON "creation_job_items"("job_id", "user_id", "target");

-- AddForeignKey
ALTER TABLE "creation_jobs" ADD CONSTRAINT "creation_jobs_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creation_job_items" ADD CONSTRAINT "creation_job_items_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "creation_jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creation_job_items" ADD CONSTRAINT "creation_job_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
