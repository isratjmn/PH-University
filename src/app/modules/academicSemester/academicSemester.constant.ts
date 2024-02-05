import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesternameCodeMapper,
  TMonths,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Spring',
];
export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesternameCodeMapper: TAcademicSemesternameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Spring: '03',
};

export const AcademicSemesterSearchableFields = ['name', 'year'];
