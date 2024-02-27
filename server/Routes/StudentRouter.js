import express from 'express'
import { addStudent,getAllStudents } from '../Controllers/StudentController.js';

const router = express.Router();

router.post('/addStudent',addStudent);
router.get('/getAllStudents',getAllStudents);

export default router;