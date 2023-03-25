-- DropForeignKey
ALTER TABLE `Stock` DROP FOREIGN KEY `Stock_product_id_fkey`;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
