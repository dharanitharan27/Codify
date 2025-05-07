import mongoose from "mongoose";

const moduleSchema = mongoose.Schema({
  moduleId: {
    type: String,
    required: true
  },
  moduleName: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  }
});

const courseProgressSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'in-progress'
  },
  currentVideoTime: {
    type: Number,
    default: 0
  },
  currentVideoId: {
    type: String,
    default: ''
  },
  totalHoursSpent: {
    type: Number,
    default: 0
  },
  // Store progress for each video in a playlist as a regular object
  // Using Mixed type instead of Map for better JSON serialization
  videoProgress: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  modules: [moduleSchema]
});

// Compound index to ensure a user can only have one progress record per course
courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress;
