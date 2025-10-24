
import mongoose from 'mongoose';

const supportTicketSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  customerName: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, default: 'Open' },
}, {
  timestamps: true,
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);
export default SupportTicket;
