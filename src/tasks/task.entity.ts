import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { type TaskStatus } from './task.model'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    title: string

  @Column()
    description: string

  @Column()
    status: TaskStatus
}
