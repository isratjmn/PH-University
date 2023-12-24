import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is Created Successfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseService.updateOfferedCourseIntoBD(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is Created Successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  // getAllOfferedCoursesFromDB,
  updateOfferedCourse,
};
