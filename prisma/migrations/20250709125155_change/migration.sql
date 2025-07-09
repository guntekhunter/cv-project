/*
  Warnings:

  - You are about to drop the column `email` on the `PersonalData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PersonalData" DROP COLUMN "email",
ADD COLUMN     "myemail" TEXT;
