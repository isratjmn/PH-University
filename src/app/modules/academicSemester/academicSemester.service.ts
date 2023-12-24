import httpStatus from 'http-status';
import { academicSemesternameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemeter } from './academicSemester.model';
import AppError from '../../errors/AppError';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // Semester Name  ----> Semester Code
  // academicSemesternameCodeMapper['Spring']
  if (academicSemesternameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }
  const result = await AcademicSemeter.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemeter.find();
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
};
