
import mongoose from 'mongoose';

const milkIntakeSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    cowMilkLiters: { type: Number, required: true },
    buffaloMilkLiters: { type: Number, required: true },
}, {
    timestamps: true,
});

const MilkIntake = mongoose.model('MilkIntake', milkIntakeSchema);
export default MilkIntake;
