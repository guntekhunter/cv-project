/*
  Warnings:

  - You are about to drop the column `orderIndex` on the `Organisation` table. All the data in the column will be lost.
  - Added the required column `order_index` to the `Organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organisation" DROP COLUMN "orderIndex",
ADD COLUMN     "order_index" INTEGER NOT NULL;
