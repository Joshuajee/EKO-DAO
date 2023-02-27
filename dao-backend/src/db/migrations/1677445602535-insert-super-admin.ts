import { Admin } from 'src/features/admins/entities/admin.entity';
import { RolesEnum } from 'src/features/admins/enums/roles.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertSuperAdmin1677445602535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const superAdmin = new Admin(
      'super-admin@ekolance.com',
      '0xE33C28d21BB90a95E3745296124d338a4D15603f',
      RolesEnum.SUPER_ADMIN,
    );
    await queryRunner.manager.save(superAdmin);
  }

  /**
   * Super Admin wallet
  "address": "0xE33C28d21BB90a95E3745296124d338a4D15603f",
  "publicKey": "0x19067f1ce95a9d43a00f1f9ba7180bcca7e0b8d70ae358dd6a8bb3cf10a27a6729ba0f01ac18789d57a7fea62a0a67d37b56d532343a1d9ac09e5a84c917e20e",
  "privateKey": "0x064a69032279ebb3e03a28590686183cde180b5dbbcef150d21438066d90b9e3"
   */
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
