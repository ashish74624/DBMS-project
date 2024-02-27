import express from 'express'
import { addBook, getAllBooks } from '../Controllers/BookController.js';

const router = express.Router();

router.post('/addBook',addBook);
router.get('/getAllBooks',getAllBooks);

export default router;