/*
  Warnings:

  - You are about to drop the `Social_media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Social_media";

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "link_or_number" TEXT NOT NULL,
    "personal_data_id" INTEGER NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_personal_data_id_key" ON "SocialMedia"("personal_data_id");

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_personal_data_id_fkey" FOREIGN KEY ("personal_data_id") REFERENCES "PersonalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
