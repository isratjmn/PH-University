/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicDepartment } from './../academicDepartment/academicDepartment.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateStudentId,
  generateFacultyId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Admin } from '../Admin/admin.model';

import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // Create a User Object
  const userData: Partial<TUser> = {};
  // If password is not Given , Use default password
  userData.password = password || (config.default_pass as string);

  // Set Student Role
  userData.role = 'student';
  userData.email = payload.email;

  // Find Academic Semester Info
  const admisssionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admisssionSemester) {
    throw new AppError(400, 'Admission Semester not Found');
  }
  //Find Department
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Admission Department not Found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Set Generated ID
    userData.id = await generateStudentId(admisssionSemester!);
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      // Send Image to Cloudinary Server
      /* const { secure_url } = await sendImageToCloudinary(imageName, path); */
      const result: any = await sendImageToCloudinary(imageName, path);
      const secure_url: string = result.secure_url;
      payload.profileImg = secure_url;
    }

    // Create a User (Transaction - 1)
    const newUser = await User.create([userData], { session }); //* because of using transaction newuser is not an Array But Befor it was an Object

    // Create a Student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }
    // Set id, _id as User
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference_id

    // Create a Student (Transaction - 2)

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};
  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);
  //set Faculty Role
  userData.role = 'faculty';
  //set Faculty Email
  userData.email = payload.email;
  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
  payload.AcademicFaculty = academicDepartment?.academicFaculty;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinary
      const result: any = await sendImageToCloudinary(imageName, path);
      const secure_url: string = result.secure_url;
      payload.profileImg = secure_url as string;
    }
    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array
    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    // create a faculty (transaction-2)
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};



const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<TUser> = {};
  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);
  //set Admin role
  userData.role = 'admin';
  //set Admin Email
  userData.email = payload.email;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinary
      const result: any = await sendImageToCloudinary(imageName, path);
      const secure_url: string = result.secure_url;
      payload.profileImg = secure_url as string;
    }
    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  /* const decoded = verifyToken(token, config.jwt_access_secret as string);
  const { userId, role } = decoded; */
  // console.log(userId, role);
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({
      id: userId,
    }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({
      id: userId,
    }).populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({
      id: userId,
    }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
