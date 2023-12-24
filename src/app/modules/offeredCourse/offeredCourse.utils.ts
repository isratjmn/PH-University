import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);

    const newStartingTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndingTime = new Date(`1970-01-01T${newSchedule.endTime}`);
    if (
      newStartingTime < existingEndTime &&
      newEndingTime > existingStartTime
    ) {

      return true;
    }
  }

  return false;
};
