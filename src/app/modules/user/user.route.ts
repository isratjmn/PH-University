import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { CreateStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../../middleware/validateRequest';
import { AdminValidations } from '../Admin/admin.validation';
import auth from '../../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(CreateStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),

  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),

  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.get(
  '/me',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  UserControllers.getMe,
);

export const UserRoutes = router;
