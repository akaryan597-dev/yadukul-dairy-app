
import mongoose from 'mongoose';

const conversionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  milkUsedLiters: { type: Number, required: true },
  curdProducedKg: { type: Number, required: true },
  paneerProducedKg: { type: Number, required: true },
}, {
  timestamps: true,
});

const Conversion = mongoose.model('Conversion', conversionSchema);
export default Conversion;
