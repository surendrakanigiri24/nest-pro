import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'
import { TaskStatus } from '../task.enum'

export class GetTasksByFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus

  @IsOptional()
  @IsNotEmpty()
    search: string
}
