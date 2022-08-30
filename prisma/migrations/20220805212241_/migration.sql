/*
  Warnings:

  - Made the column `involvement` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `summary` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "github" DROP NOT NULL,
ALTER COLUMN "involvement" SET NOT NULL,
ALTER COLUMN "summary" SET NOT NULL,
ALTER COLUMN "website" DROP NOT NULL;
