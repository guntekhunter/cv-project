/*
  Warnings:

  - You are about to drop the column `social_media_id` on the `PersonalData` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SocialMedia_personal_data_id_key";

-- AlterTable
ALTER TABLE "PersonalData" DROP COLUMN "social_media_id";
