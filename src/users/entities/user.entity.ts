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

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];
}
