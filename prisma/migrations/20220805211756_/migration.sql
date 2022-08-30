/*
  Warnings:

  - Added the required column `github` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stage` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "discord" TEXT,
ADD COLUMN     "github" TEXT NOT NULL,
ADD COLUMN     "involvement" TEXT,
ADD COLUMN     "stage" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "website" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
