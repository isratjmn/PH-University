import { USER_ROLE } from './../user/user.constant';
import express from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import validateRequest from '../../../middleware/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post(
  '/create-offered-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.faculty, USER_ROLE.admin),
  OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.student,
  ),
  OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
  '/my-offered-courses',
  auth(USER_ROLE.student),
  OfferedCourseControllers.getMyOfferedCourses,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(offeredCourseValidations.updateOfferedValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

export const offeredCourseRoutes = router;
