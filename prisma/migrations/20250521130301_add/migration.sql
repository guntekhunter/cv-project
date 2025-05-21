/*
  Warnings:

  - Added the required column `type` to the `Cv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cv" ADD COLUMN     "type" INTEGER NOT NULL;
