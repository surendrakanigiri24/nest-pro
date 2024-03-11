import { Injectable } from '@nestjs/common'
import { type Task } from './task.model'

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = []

  getAllTasks (): Task[] {
    return this.tasks
  }
}
