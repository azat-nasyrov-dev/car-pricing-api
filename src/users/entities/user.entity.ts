import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReportEntity } from '../../reports/entities/report.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true }) /* default: true property for temporary uses */
  admin: boolean;

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];
}
