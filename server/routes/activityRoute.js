import express from 'express';
import { 
  addActivity, 
  getUserActivities, 
  getCourseActivities 
} from '../controllers/activityController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const activityRouter = express.Router();

// Add a new activity
activityRouter.post('/add', authMiddleware, addActivity);

// Get all activities for a user
activityRouter.get('/', authMiddleware, getUserActivities);

// Get activities for a specific course
activityRouter.get('/course/:courseId', authMiddleware, getCourseActivities);

export default activityRouter;
