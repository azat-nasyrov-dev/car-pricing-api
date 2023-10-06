import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminToUsers1696564881121 implements MigrationInterface {
  name = 'AddAdminToUsers1696564881121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
  }
}
