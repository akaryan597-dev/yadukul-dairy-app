
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import reviewRoutes from './routes/review.routes';
import conversionRoutes from './routes/conversion.routes';
import staffActivityRoutes from './routes/staffActivity.routes';
import supportTicketRoutes from './routes/supportTicket.routes';
import milkIntakeRoutes from './routes/milkIntake.routes';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/', (req, res) => res.send('Yadukul Dairy API is running...'));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/conversions', conversionRoutes);
app.use('/api/staff-activities', staffActivityRoutes);
app.use('/api/support-tickets', supportTicketRoutes);
app.use('/api/milk-intake', milkIntakeRoutes);


// Server Startup
app.listen(PORT, () => {
    console.log(`Backend server is listening on http://localhost:${PORT}`);
});
