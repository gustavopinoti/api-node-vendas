import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrders1624825448084 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'DATETIME',
                        default: 'NOW()',
                    },
                    {
                        name: 'updated_at',
                        type: 'DATETIME',
                        default: 'NOW()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('orders');
    }
}
