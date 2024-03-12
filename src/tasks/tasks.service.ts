import { Injectable } from '@nestjs/common'
import { TaskStatus, type Task } from './task.model'
import * as uuid from 'uuid'
import { type CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = []

  getAllTasks (): Task[] {
    return this.tasks
  }

  createTask (createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto
    const task: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)
    return task
  }
}
