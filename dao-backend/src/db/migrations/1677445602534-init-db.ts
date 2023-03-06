import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDb1677445602534 implements MigrationInterface {
  name = 'initDb1677445602534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "walletAddress" character varying NOT NULL, "role" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"), CONSTRAINT "UQ_d13a96259a54615153f70307559" UNIQUE ("walletAddress"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cohorts" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fd38f76b135e907b834fda1e752" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cohorts"`);
    await queryRunner.query(`DROP TABLE "admins"`);
  }
}
