import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../courses/course.model';
import { Faculty } from '../faculty/faculty.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,

    days,
    startTime,
    endTime,
  } = payload;

  // Check if the Semester Registration id is Exists!!
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration not Found');
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not Found');
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not Found');
  }

  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not Found');
  }

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not Found');
  }

  // Check if the Department is belong to the faulty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not Belong to this ${isAcademicFacultyExists.name}`,
    );
  }

  // Check if the same Offered Course same section in same registered Semester
  const isSameOfferedCourseWithSameSec = await OfferedCourse.findOne({
    SemesterRegistration,
    course,
    section,
  });
  if (isSameOfferedCourseWithSameSec) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered Course with same section is already exists`,
    );
  }

  // Get the Schedules of the Faculties
  const assignedSchedules = await OfferedCourse.find({
    SemesterRegistration,
    faculty,
    days: {
      $in: days,
    },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This Faculty is not Available at that time !! Choose another time or day`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

/* const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {} */

const updateOfferedCourseIntoBD = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not Found');
  }
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not Found');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  // Get the Schedules of the Faculties

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'Upcoming') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this Offered Course as it is ${semesterRegistrationStatus?.status}`,
    );
  }
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {
      $in: days,
    },
  }).select('days startTime endTime');
  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This Faculty is not Available at that time !! Choose another time or day`,
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  // getAllOfferedCoursesFromDB,
  updateOfferedCourseIntoBD,
};
