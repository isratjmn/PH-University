import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaulty.validation';
import { AcademicFacultyControllers } from './academiccFaculty.controller';

const router = express.Router();
router.post(
  '/create-academic-faculty',
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
