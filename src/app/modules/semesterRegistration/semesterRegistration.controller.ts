import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistratonService } from './semesterRegistration.service';
import { Request, Response } from 'express';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistratonService.createSemesterRegistrationIntoDB(
        req.body,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Semester Registration is Created Successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistratonService.getAllSemesterRegistrationFromDB(
        req.query,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Semester Registration is Retrived Successfully',
      data: result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistratonService.getSingleSemesterRegisterFromDB(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Semester Registration is Retrived Successfully',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistratonService.updateSemesterRegistrationIntoDB(
        id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Semester Registration is Retrived Successfully',
      data: result,
    });
  },
);

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
