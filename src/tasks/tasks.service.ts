import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskStatus, type Task } from './task.model'
import * as uuid from 'uuid'
import { type CreateTaskDto } from './dto/create-task.dto'
import { type GetTasksByFilter } from './dto/get-tasks-by-filter.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks (): Task[] {
    return this.tasks
  }

  getTasksByFilter (fileterData: GetTasksByFilter): Task[] | undefined {
    const { search, status } = fileterData
    let tasks = this.getAllTasks()

    if (status !== null) {
      tasks = tasks.filter(task => task.status === status)
    }

    if (search !== null) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search)
      )
    }

    return tasks
  }

  getTaskById (id: string): Task | undefined {
    const taskFound = this.tasks.find(task => task.id === id)

    if (taskFound === undefined) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }

    return taskFound
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
