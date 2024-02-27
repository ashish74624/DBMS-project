import express from "express";
import { addPublisher,getPublishers } from "../Controllers/PublisherController.js";


const router = express.Router();

router.post('/addPublisher',addPublisher);
router.get('/getPublishers',getPublishers);

export default router;