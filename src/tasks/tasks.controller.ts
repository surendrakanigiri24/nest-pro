import { Query, Body, Controller, Get, Param, Patch, ParseIntPipe, Post, UsePipes, ValidationPipe, Delete, UseGuards } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { type Task } from './task.entity'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { TaskStatus } from './task.enum'
import { GetTasksByFilterDto } from './dto/get-tasks-by-filter.dto'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/auth/auth.entity'
import { GetUser } from 'src/auth/get-user.decorator'

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor (private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks (
    @Query(ValidationPipe) fileterDto: GetTasksByFilterDto,
    @GetUser() user:User
  ): Promise<Task[]> {
    return await this.tasksService.getTasks(fileterDto, user)
  }

  @Get('/:id')
  async getTaskById (
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return await this.tasksService.getTaskById(id, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask (
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto, user)
  }

  @Patch('/:id')
  async updateTaskById (
    @Param('id', ParseIntPipe) id: number, 
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return await this.tasksService.updateTaskById(id, status, user)
  }

  @Delete('/:id')
  async deleteTaskById (
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user:User
  ): Promise<void> {
    await this.tasksService.deleteATask(id, user)
  }
}
