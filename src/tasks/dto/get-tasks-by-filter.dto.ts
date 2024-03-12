import { type TaskStatus } from '../task.model'

export class GetTasksByFilter {
  status: TaskStatus
  search: string
}
