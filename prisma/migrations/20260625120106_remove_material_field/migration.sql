/*
  Warnings:

  - You are about to drop the column `material` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `client` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "material",
ADD COLUMN     "client" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
