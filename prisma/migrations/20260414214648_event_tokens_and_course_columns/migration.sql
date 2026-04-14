/*
  Warnings:

  - Added the required column `finished` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "finished" BOOLEAN NOT NULL,
ADD COLUMN     "open" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "event_tokens" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "time_stamp" INTEGER NOT NULL,

    CONSTRAINT "event_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_tokens" ADD CONSTRAINT "event_tokens_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
