import { Admin } from 'src/features/admins/entities/admin.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertSuperAdmin1676409074262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* const superAdmin = new Admin();
    await queryRunner.manager.save(superAdmin); */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
