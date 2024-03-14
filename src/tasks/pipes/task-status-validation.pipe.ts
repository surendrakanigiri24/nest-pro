import { BadRequestException, type PipeTransform } from '@nestjs/common'
import { TaskStatus } from '../task.enum'

// Define a class for validation pipe
export class TaskStatusValidationPipe implements PipeTransform {
  // Define allowed task statuses
  readonly allowedStatus = [
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
    TaskStatus.DONE
  ]

  // Transform method required by the PipeTransform interface
  transform (value: any): any {
    // Convert value to uppercase to ensure consistency
    value = value.toUpperCase()

    // Check if the status is valid
    if (!this.isStatusValid(value)) {
      // Throw a BadRequestException if the status is not valid
      throw new BadRequestException(`status ${value} is not valid`)
    }
    // Return the validated value
    return value
  }

  // Method to check if the status is valid
  private isStatusValid (status: any): boolean {
    // Check if the status exists in the allowed statuses array
    const idx = this.allowedStatus.indexOf(status)
    return idx !== -1
  }
}
