-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_userId_fkey`;

-- AlterTable
ALTER TABLE `tasks` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
