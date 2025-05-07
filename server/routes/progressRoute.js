import express from 'express';
import { 
  getUserProgress, 
  getCourseProgress, 
  updateCourseProgress, 
  updateModuleProgress,
  getUserActivity
} from '../controllers/progressController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const progressRouter = express.Router();

// Get all progress for a user
progressRouter.get('/', authMiddleware, getUserProgress);

// Get user's recent activity
progressRouter.get('/activity', authMiddleware, getUserActivity);

// Get progress for a specific course
progressRouter.get('/:courseId', authMiddleware, getCourseProgress);

// Update course progress
progressRouter.put('/:courseId', authMiddleware, updateCourseProgress);

// Update module progress
progressRouter.put('/:courseId/module', authMiddleware, updateModuleProgress);

export default progressRouter;
