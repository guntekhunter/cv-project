/*
  Warnings:

  - You are about to drop the column `user_id` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Organisation` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Other` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `PersonalData` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `WorkExperience` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cv_id]` on the table `Education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cv_id]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cv_id]` on the table `Other` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cv_id]` on the table `PersonalData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cv_id]` on the table `WorkExperience` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cv_id` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cv_id` to the `Organisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cv_id` to the `Other` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cv_id` to the `PersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cv_id` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Organisation" DROP CONSTRAINT "Organisation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Other" DROP CONSTRAINT "Other_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PersonalData" DROP CONSTRAINT "PersonalData_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_user_id_fkey";

-- DropIndex
DROP INDEX "Education_user_id_key";

-- DropIndex
DROP INDEX "Organisation_user_id_key";

-- DropIndex
DROP INDEX "Other_user_id_key";

-- DropIndex
DROP INDEX "PersonalData_user_id_key";

-- DropIndex
DROP INDEX "WorkExperience_user_id_key";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "user_id",
ADD COLUMN     "cv_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Organisation" DROP COLUMN "user_id",
ADD COLUMN     "cv_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Other" DROP COLUMN "user_id",
ADD COLUMN     "cv_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PersonalData" DROP COLUMN "user_id",
ADD COLUMN     "cv_id" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "user_id",
ADD COLUMN     "cv_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "Cv" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Cv_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cv_user_id_key" ON "Cv"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Education_cv_id_key" ON "Education"("cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_cv_id_key" ON "Organisation"("cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "Other_cv_id_key" ON "Other"("cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_cv_id_key" ON "PersonalData"("cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkExperience_cv_id_key" ON "WorkExperience"("cv_id");

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalData" ADD CONSTRAINT "PersonalData_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Other" ADD CONSTRAINT "Other_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
