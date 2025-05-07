import CourseProgress from "../models/courseProgressSchema.js";
import UserActivity from "../models/userActivitySchema.js";
import Course from "../models/courseSchema.js";
import User from "../models/userSchema.js";

// Get user's progress for all courses
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const progress = await CourseProgress.find({ userId })
      .populate('courseId')
      .sort({ lastAccessedAt: -1 });
    
    if (!progress) {
      return res.status(200).json({ progress: [] });
    }
    
    return res.status(200).json({ progress });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get user's progress for a specific course
export const getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    
    const progress = await CourseProgress.findOne({ userId, courseId })
      .populate('courseId');
    
    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }
    
    return res.status(200).json({ progress });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Update course progress
export const updateCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const { progress, currentVideoTime, totalHoursSpent, status } = req.body;
    
    // Find or create progress record
    let progressRecord = await CourseProgress.findOne({ userId, courseId });
    
    if (!progressRecord) {
      // Check if course exists
      const courseExists = await Course.findById(courseId);
      if (!courseExists) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      // Create new progress record
      progressRecord = new CourseProgress({
        userId,
        courseId,
        progress: progress || 0,
        currentVideoTime: currentVideoTime || 0,
        totalHoursSpent: totalHoursSpent || 0,
        status: status || 'in-progress'
      });
      
      // Create activity for starting course
      const activity = new UserActivity({
        userId,
        courseId,
        activityType: 'started_course'
      });
      
      await activity.save();
    } else {
      // Update existing record
      progressRecord.lastAccessedAt = Date.now();
      
      if (progress !== undefined) {
        progressRecord.progress = progress;
      }
      
      if (currentVideoTime !== undefined) {
        progressRecord.currentVideoTime = currentVideoTime;
      }
      
      if (totalHoursSpent !== undefined) {
        progressRecord.totalHoursSpent = totalHoursSpent;
      }
      
      if (status !== undefined) {
        progressRecord.status = status;
        
        // If status changed to completed, update completedAt
        if (status === 'completed' && !progressRecord.completedAt) {
          progressRecord.completedAt = Date.now();
          
          // Create activity for completing course
          const activity = new UserActivity({
            userId,
            courseId,
            activityType: 'completed_course'
          });
          
          await activity.save();
        }
      }
    }
    
    await progressRecord.save();
    
    return res.status(200).json({ 
      message: "Progress updated successfully",
      progress: progressRecord
    });
  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Update module progress
export const updateModuleProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const { moduleId, moduleName, completed } = req.body;
    
    if (!moduleId || !moduleName) {
      return res.status(400).json({ error: "Module ID and name are required" });
    }
    
    let progressRecord = await CourseProgress.findOne({ userId, courseId });
    
    if (!progressRecord) {
      return res.status(404).json({ error: "Course progress not found" });
    }
    
    // Find module if it exists
    const moduleIndex = progressRecord.modules.findIndex(
      module => module.moduleId === moduleId
    );
    
    if (moduleIndex === -1) {
      // Add new module
      progressRecord.modules.push({
        moduleId,
        moduleName,
        completed: completed || false,
        completedAt: completed ? Date.now() : null
      });
    } else {
      // Update existing module
      if (completed !== undefined && completed !== progressRecord.modules[moduleIndex].completed) {
        progressRecord.modules[moduleIndex].completed = completed;
        
        if (completed) {
          progressRecord.modules[moduleIndex].completedAt = Date.now();
          
          // Create activity for completing module
          const activity = new UserActivity({
            userId,
            courseId,
            moduleId,
            moduleName,
            activityType: 'completed_module'
          });
          
          await activity.save();
        } else {
          progressRecord.modules[moduleIndex].completedAt = null;
        }
      }
    }
    
    // Update overall progress based on completed modules
    const totalModules = progressRecord.modules.length;
    const completedModules = progressRecord.modules.filter(module => module.completed).length;
    
    if (totalModules > 0) {
      progressRecord.progress = Math.round((completedModules / totalModules) * 100);
      
      // If all modules are completed, mark course as completed
      if (completedModules === totalModules) {
        progressRecord.status = 'completed';
        progressRecord.completedAt = Date.now();
        
        // Create activity for completing course
        const activity = new UserActivity({
          userId,
          courseId,
          activityType: 'completed_course'
        });
        
        await activity.save();
      }
    }
    
    progressRecord.lastAccessedAt = Date.now();
    await progressRecord.save();
    
    return res.status(200).json({
      message: "Module progress updated successfully",
      progress: progressRecord
    });
  } catch (error) {
    console.error("Error updating module progress:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get user's recent activity
export const getUserActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    
    const activities = await UserActivity.find({ userId })
      .populate('courseId')
      .sort({ timestamp: -1 })
      .limit(limit);
    
    return res.status(200).json({ activities });
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
