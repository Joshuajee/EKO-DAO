import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesEnum } from '../enums/roles.enum';

@Entity('admins')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsEnum(RolesEnum)
  role: RolesEnum;

  @CreateDateColumn({ update: false })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert() @BeforeUpdate() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
