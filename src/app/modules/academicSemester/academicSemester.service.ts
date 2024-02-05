import httpStatus from 'http-status';
import {
  AcademicSemesterSearchableFields,
  academicSemesternameCodeMapper,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
// import { AcademicSemeter } from './academicSemester.model';
import AppError from '../../errors/AppError';
import { AcademicSemester } from './academicSemester.model';
import QueryBuilder from '../../../builder/QueryBuilder';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // Semester Name  ----> Semester Code
  // academicSemesternameCodeMapper['Spring']
  if (academicSemesternameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    result,
    meta,
  };
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
};
