
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  customerInfo: {
    name: String,
    street: String,
    city: String,
    pin: String,
    contactNumber: String,
  },
  status: { type: String, required: true, default: 'Pending' },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  frequency: { type: String, required: true },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
