/*
  Warnings:

  - Added the required column `orderIndex` to the `Organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "orderIndex" INTEGER NOT NULL;
