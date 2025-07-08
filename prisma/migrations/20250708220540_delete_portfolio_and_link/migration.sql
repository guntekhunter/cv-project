/*
  Warnings:

  - You are about to drop the column `link` on the `PersonalData` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio` on the `PersonalData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PersonalData" DROP COLUMN "link",
DROP COLUMN "portfolio";
