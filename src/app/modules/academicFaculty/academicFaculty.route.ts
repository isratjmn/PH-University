import { USER_ROLE } from './../user/user.constant';
import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaulty.validation';
import { AcademicFacultyControllers } from './academiccFaculty.controller';
import auth from '../../../middleware/auth';


const router = express.Router();
router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.get('/', AcademicFacultyControllers.getAllAcademicfaculties);
export const AcademicFacultyRoutes = router;
