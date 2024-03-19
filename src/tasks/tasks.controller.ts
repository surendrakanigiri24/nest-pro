import { Query, Body, Controller, Get, Param, Patch, ParseIntPipe, Post, UsePipes, ValidationPipe, Delete, UseGuards } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { type Task } from './task.entity'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { TaskStatus } from './task.enum'
import { GetTasksByFilterDto } from './dto/get-tasks-by-filter.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor (private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks (@Query(ValidationPipe) fileterDto: GetTasksByFilterDto): Promise<Task[]> {
    return await this.tasksService.getTasks(fileterDto)
  }

  @Get('/:id')
  async getTaskById (@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask (@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto)
  }

  @Patch('/:id')
  async updateTaskById (@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
    return await this.tasksService.updateTaskById(id, status)
  }

  @Delete('/:id')
  async deleteTaskById (@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.deleteATask(id)
  }
}
