import express from 'express'
import { addLoan, getAllLoans, getStudentLoans } from '../Controllers/LoanController.js';

const router = express.Router();

router.post('/addLoan',addLoan);
router.get('/getAllLoans',getAllLoans);
router.get('/getStudentLoans',getStudentLoans);

export default router;