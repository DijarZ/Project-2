/*
  Warnings:

  - You are about to drop the column `status` on the `taskstatus` table. All the data in the column will be lost.
  - You are about to drop the column `table_id` on the `taskstatus` table. All the data in the column will be lost.
  - Added the required column `status_name` to the `taskstatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task_id` to the `taskstatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `taskstatus` DROP FOREIGN KEY `taskstatus_table_id_fkey`;

-- AlterTable
ALTER TABLE `taskstatus` DROP COLUMN `status`,
    DROP COLUMN `table_id`,
    ADD COLUMN `status_name` ENUM('to_do', 'in_progress', 'blocked', 'in_review', 'done') NOT NULL,
    ADD COLUMN `task_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `taskstatus` ADD CONSTRAINT `taskstatus_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Tasks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
