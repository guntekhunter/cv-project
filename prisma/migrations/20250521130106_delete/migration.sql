-- DropForeignKey
ALTER TABLE "Cv" DROP CONSTRAINT "Cv_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_cv_id_fkey";

-- DropForeignKey
ALTER TABLE "Organisation" DROP CONSTRAINT "Organisation_cv_id_fkey";

-- DropForeignKey
ALTER TABLE "Other" DROP CONSTRAINT "Other_cv_id_fkey";

-- DropForeignKey
ALTER TABLE "PersonalData" DROP CONSTRAINT "PersonalData_cv_id_fkey";

-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_personal_data_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_cv_id_fkey";

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_personal_data_id_fkey" FOREIGN KEY ("personal_data_id") REFERENCES "PersonalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalData" ADD CONSTRAINT "PersonalData_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Other" ADD CONSTRAINT "Other_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
