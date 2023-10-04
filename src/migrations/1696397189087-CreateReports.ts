import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReports1696397189087 implements MigrationInterface {
  name = 'CreateReports1696397189087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reports" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "make" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, "longitude" integer NOT NULL, "latitude" integer NOT NULL, "mileage" integer NOT NULL, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reports"`);
  }
}
