// import { type CreateTaskDto } from './dto/create-task.dto'
import { type Task } from './task.entity'
import { Repository } from 'typeorm'
// import { TaskStatus } from './task.enum'

export class TaskRepository extends Repository<Task> {
  // Your custom repository methods here
}
