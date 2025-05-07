import mongoose from "mongoose";

const userActivitySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    enum: ['started_course', 'completed_module', 'completed_course', 'added_to_watchlist', 'removed_from_watchlist'],
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  moduleId: {
    type: String,
    default: null
  },
  moduleName: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);
export default UserActivity;
