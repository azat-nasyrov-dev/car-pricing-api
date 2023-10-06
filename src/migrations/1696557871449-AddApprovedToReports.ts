import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddApprovedToReports1696557871449 implements MigrationInterface {
  name = 'AddApprovedToReports1696557871449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reports" ADD "approved" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "approved"`);
  }
}
