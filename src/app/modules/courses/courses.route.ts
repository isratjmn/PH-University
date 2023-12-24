import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import auth from '../../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseVlidationSchema),
  CourseControllers.createCourses,
);
router.get(
  '/:id',
  auth('admin', 'student', 'faculty'),
  CourseControllers.getSingleCourses,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete('/:id', auth('admin'), CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;

