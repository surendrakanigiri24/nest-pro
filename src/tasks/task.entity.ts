import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { type TaskStatus } from './task.enum'
import { User } from 'src/auth/auth.entity'

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

  @ManyToOne(type => User, user => user.tasks)
    user:User

  @Column()
    userId: number
}
