import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsBetweenReportsAndUsers1696453958119
  implements MigrationInterface
{
  name = 'AddRelationsBetweenReportsAndUsers1696453958119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reports" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_bed415cd29716cd707e9cb3c09c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_bed415cd29716cd707e9cb3c09c"`,
    );
    await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "userId"`);
  }
}
