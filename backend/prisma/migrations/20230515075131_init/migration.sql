-- CreateTable
CREATE TABLE `Projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectName` VARCHAR(191) NOT NULL,
    `reasons` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `division` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `priority` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `start_date_as_per_project_plan` DATETIME(3) NOT NULL,
    `end_date_as_per_project_plan` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
