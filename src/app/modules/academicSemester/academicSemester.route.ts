import { USER_ROLE } from './../user/user.constant';
import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get(
  '/',
  auth(
    USER_ROLE.student,
    USER_ROLE.faculty,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
  ),
  AcademicSemesterControllers.getAllAcademicSemester,
);

router.get(
  '/:semesterId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
