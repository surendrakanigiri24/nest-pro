import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TaskStatus, type Task } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksByFilter } from './dto/get-tasks-by-filter.dto'

@Controller('tasks')
export class TasksController {
  constructor (private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks (@Query() fileterData: GetTasksByFilter): Task[] | undefined {
    if (Object.keys(fileterData).length > 0) {
      return this.tasksService.getTasksByFilter(fileterData)
    }
    return this.tasksService.getAllTasks()
  }

  @Get('/:id')
  getTaskById (@Param('id') id: string): Task | undefined {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask (@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Patch('/:id')
  updateTaskById (@Param('id') id: string, @Body('status') status: TaskStatus): Task | undefined {
    return this.tasksService.updateTaskById(id, status)
  }

  @Delete('/:id')
  deleteTaskById (@Param('id') id: string): void {
    this.tasksService.deleteATask(id)
  }
}
