
import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// FIX: Define an interface for the User document to provide strong typing and include custom methods.
export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  role: 'Owner' | 'Staff' | 'Customer';
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Owner', 'Staff', 'Customer'] },
}, {
  timestamps: true,
});

// Hash password before saving
// FIX: Use IUser type for 'this' context in pre-save hook.
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// FIX: Use IUser type with the model.
const User = mongoose.model<IUser>('User', userSchema);
export default User;
