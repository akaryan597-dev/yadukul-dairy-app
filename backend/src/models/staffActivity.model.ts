
import mongoose from 'mongoose';

const staffActivitySchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  staffName: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
}, {
  timestamps: true,
});

const StaffActivity = mongoose.model('StaffActivity', staffActivitySchema);
export default StaffActivity;
