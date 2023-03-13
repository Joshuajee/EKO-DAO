import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
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

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsEnum(RolesEnum)
  role: RolesEnum;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    email: string,
    walletAddress: string,
    password: string,
    role: RolesEnum,
  ) {
    super();
    this.email = email;
    this.walletAddress = walletAddress;
    this.password = password;
    this.role = role;
  }

  @BeforeInsert() @BeforeUpdate() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
