import { Injectable, NotFoundException } from '@nestjs/common'
import { type CreateTaskDto } from './dto/create-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { Task } from './task.entity'
import { TaskStatus } from './task.enum'
import { type GetTasksByFilterDto } from './dto/get-tasks-by-filter.dto'
import { User } from 'src/auth/auth.entity'

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository
  ) {}

  async getTasks (
    filterDto: GetTasksByFilterDto,
    user: User
  ): Promise<Task[]> {
    const { status, search } = filterDto

    const query = this.taskRepository.createQueryBuilder('task')
    query.where('task.userId = :userId', {userId: user.id})

    if (status !== undefined) {
      query.andWhere('status = :status', { status })
    }

    if (search !== undefined) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
    }
    const tasks = await query.getMany()
    return tasks
  }

  async getTaskById (id: number): Promise<Task> {
    const taskFound = await this.taskRepository.findOneBy({ id })

    if (taskFound === undefined || taskFound === null) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }

    return taskFound
  }

  async createTask (
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto

    const task = new Task()

    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    task.user = user
    await task.save()

    return task
  }

  async deleteATask (id: number): Promise<void> {
    const taskDelete = await this.taskRepository.delete({ id })
    if (taskDelete.affected === 0) { throw new NotFoundException(`Task with id ${id} not found`) }
  }

  async updateTaskById (id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status
    await task.save()
    return task
  }
}
