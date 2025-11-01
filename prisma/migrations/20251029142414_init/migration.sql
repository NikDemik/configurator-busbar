-- CreateTable
CREATE TABLE `BusbarSeries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('TROLLEY', 'MONO') NOT NULL,
    `amperage` INTEGER NOT NULL,
    `phases` INTEGER NOT NULL,
    `material` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Component` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `category` ENUM('HOUSING', 'CONDUCTOR', 'ACCESSORY', 'CONNECTOR', 'FEED', 'SUPPORT', 'END_CAP') NOT NULL,
    `compatibleFor` ENUM('TROLLEY', 'MONO') NOT NULL,
    `params` JSON NULL,

    UNIQUE INDEX `Component_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userEmail` VARCHAR(191) NULL,
    `busbarType` ENUM('TROLLEY', 'MONO') NOT NULL,
    `seriesId` INTEGER NULL,
    `amperage` INTEGER NOT NULL,
    `phases` INTEGER NOT NULL,
    `totalLength` DOUBLE NOT NULL,
    `components` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SeriesComponents` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SeriesComponents_AB_unique`(`A`, `B`),
    INDEX `_SeriesComponents_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SeriesComponents` ADD CONSTRAINT `_SeriesComponents_A_fkey` FOREIGN KEY (`A`) REFERENCES `BusbarSeries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeriesComponents` ADD CONSTRAINT `_SeriesComponents_B_fkey` FOREIGN KEY (`B`) REFERENCES `Component`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
