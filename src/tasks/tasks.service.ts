import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskStatus } from './task.enum'
import { type CreateTaskDto } from './dto/create-task.dto'
import { type GetTasksByFilterDto } from './dto/get-tasks-by-filter.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { Task } from './task.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}
  // private tasks: Task[] = []

  // getAllTasks (): Task[] {
  //   return this.tasks
  // }

  // getTasksByFilter (fileterData: GetTasksByFilterDto): Task[] | undefined {
  //   const { search, status } = fileterData
  //   let tasks = this.getAllTasks()

  //   if (status !== null) {
  //     tasks = tasks.filter(task => task.status === status)
  //   }

  //   if (search !== null) {
  //     tasks = tasks.filter(task =>
  //       task.title.includes(search) ||
  //       task.description.includes(search)
  //     )
  //   }

  //   return tasks
  // }

  async getTaskById (id: number): Promise<Task> {
    const taskFound = await this.taskRepository.findOneBy({ id })

    if (taskFound === undefined || taskFound === null) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }

    return taskFound
  }

  // getTaskById (id: string): Task | undefined {
  //   const taskFound = this.tasks.find(task => task.id === id)

  //   if (taskFound === undefined) {
  //     throw new NotFoundException(`Task with id ${id} not found`)
  //   }

  //   return taskFound
  // }

  // updateTaskById (id: string, status: TaskStatus): Task | undefined {
  //   const task = this.getTaskById(id)
  //   if ((task?.status) != null) task.status = status
  //   return task
  // }

  // createTask (createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto
  //   const task: Task = {
  //     id: uuid.v4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   }

  //   this.tasks.push(task)
  //   return task
  // }

  // deleteATask (id: string): void {
  //   this.tasks = this.tasks.filter(task => task.id !== id)
  // }
}
