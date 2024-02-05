import { USER_ROLE } from './../user/user.constant';
import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(USER_ROLE.admin, USER_ROLE.admin),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),

  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.admin),

  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  SemesterRegistrationControllers.getAllSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
