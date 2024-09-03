/*
  Warnings:

  - A unique constraint covering the columns `[companyEmail]` on the table `AgencyHub` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `agencyhub` MODIFY `companyEmail` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AgencyHub_companyEmail_key` ON `AgencyHub`(`companyEmail`);
