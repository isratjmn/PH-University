import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeFormatRegex = /^(?:2[0-3]|1\d|0\d):[0-5]\d$/;
const timeStringSchema = z
  .string()
  .refine((time) => timeFormatRegex.test(time), {
    message: "Invalid Time Format, Expected 'HH:MM' in 24 Hrs Format",
  });

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      // academicSemester: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // StartTime: 10:30 => 1970-01-01T10:30
        // EndTime: 12:30 => 1970-01-01T12:30
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start Time Should be Before End Time',
      },
    ),
});

const updateOfferedValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // StartTime: 10:30 => 1970-01-01T10:30
        // EndTime: 12:30 => 1970-01-01T12:30
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start Time Should be Before End Time',
      },
    ),
});

export const offeredCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedValidationSchema,
};
