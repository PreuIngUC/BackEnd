-- AddForeignKey
ALTER TABLE "course_applications" ADD CONSTRAINT "course_applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
