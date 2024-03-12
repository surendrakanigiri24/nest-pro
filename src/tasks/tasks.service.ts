import { Injectable } from '@nestjs/common'
import { TaskStatus, type Task } from './task.model'
import * as uuid from 'uuid'
import { type CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks (): Task[] {
    return this.tasks
  }

  getTaskById (id: string): Task | undefined {
    return this.tasks.find(task => task.id === id)
  }

  updateTaskById (id: string, status: TaskStatus): Task | undefined {
    const task = this.getTaskById(id)
    if ((task?.status) != null) task.status = status
    return task
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

  deleteATask (id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }
}
