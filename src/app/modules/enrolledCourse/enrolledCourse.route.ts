import { USER_ROLE } from './../user/user.constant';
import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrollCourseControllers } from './enrolledCourse.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  EnrollCourseControllers.createEnrolledCourse,
);

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  EnrollCourseControllers.getMyEnrolledCourses,
);

router.patch(
  '/enrolled-course-marks',
  auth(USER_ROLE.faculty, USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledMarksValidationSchema,
  ),
  EnrollCourseControllers.updateEnrollCourseMarks,
);

export const EnrollCourseRoutes = router;
