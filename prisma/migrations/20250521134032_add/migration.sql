-- DropIndex
DROP INDEX "Cv_user_id_key";

-- AlterTable
ALTER TABLE "Cv" ADD COLUMN     "temp_token" TEXT,
ALTER COLUMN "user_id" DROP NOT NULL;
