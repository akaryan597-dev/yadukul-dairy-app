
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model';
import Product from './models/product.model';
import Order from './models/order.model';
import Review from './models/review.model';
import Conversion from './models/conversion.model';
import StaffActivity from './models/staffActivity.model';
import SupportTicket from './models/supportTicket.model';
import MilkIntake from './models/milkIntake.model';


dotenv.config();

const MOCK_USERS_DATA = [
    { name: 'Ramesh Kumar', role: 'Owner', username: 'owner', password: 'password' },
    { name: 'Suresh Singh', role: 'Staff', username: 'staff1', password: 'password' },
    { name: 'Amit Patel', role: 'Customer', username: 'customer1', password: 'password' },
    { name: 'Priya Sharma', role: 'Customer', username: 'customer2', password: 'password' },
    { name: 'Vikas Gupta', role: 'Staff', username: 'staff2', password: 'password' },
];

const MOCK_PRODUCTS_DATA = [
    { name: 'Cow Milk', type: 'Cow Milk', price: 55, unit: 'litre', imageUrl: 'https://picsum.photos/400/300?image=883', stock: 1000 },
    { name: 'Buffalo Milk', type: 'Buffalo Milk', price: 65, unit: 'litre', imageUrl: 'https://picsum.photos/400/300?image=1069', stock: 800 },
    { name: 'Fresh Curd', type: 'Curd', price: 80, unit: 'kg', imageUrl: 'https://picsum.photos/400/300?image=292', stock: 150 },
    { name: 'Paneer', type: 'Paneer', price: 350, unit: 'kg', imageUrl: 'https://picsum.photos/400/300?image=985', stock: 100 },
];

const MOCK_REVIEWS_DATA = [
    { customerName: 'Anjali S.', rating: 5, comment: 'The best and freshest milk in Noida. Delivery is always on time!', date: '2023-10-25' },
    { customerName: 'Vikram R.', rating: 5, comment: 'Paneer is so soft and delicious. My family loves it.', date: '2023-10-24' },
    { customerName: 'Sunita M.', rating: 4, comment: 'Good quality curd, very thick. Sometimes the delivery is a bit late.', date: '2023-10-23' },
    { customerName: 'Rajesh G.', rating: 5, comment: 'I have a daily subscription for buffalo milk, and the quality has been consistent. Highly recommended.', date: '2023-10-22' },
    { customerName: 'Pooja T.', rating: 5, comment: 'Excellent customer service. They resolved my query very quickly.', date: '2023-10-21' },
    { customerName: 'Deepak K.', rating: 4, comment: 'The cow milk tastes very natural. My kids love it.', date: '2023-10-20' },
    { customerName: 'Neha B.', rating: 5, comment: 'Finally, a reliable dairy service in our area. Keep up the great work!', date: '2023-10-19' },
    { customerName: 'Arun J.', rating: 5, comment: 'The quality of their products is unmatched. Very happy with the subscription.', date: '2023-10-18' },
    { customerName: 'Kavita P.', rating: 3, comment: 'Milk is good, but the packaging could be better. Sometimes it leaks.', date: '2023-10-17' },
    { customerName: 'Manoj V.', rating: 5, comment: 'Superb quality and always fresh. The best dairy farm in the city.', date: '2023-10-16' },
    { customerName: 'Swati N.', rating: 5, comment: 'Their app is so easy to use for managing my subscription. Very convenient.', date: '2023-10-15' },
    { customerName: 'Alok D.', rating: 4, comment: 'Great products. The paneer is a must-try!', date: '2023-10-14' },
    { customerName: 'Rina S.', rating: 5, comment: 'I trust Yadukul Dairy for my family\'s daily needs. Pure and fresh.', date: '2023-10-13' },
    { customerName: 'Sanjay C.', rating: 4, comment: 'Very responsive support team. I had an issue with my order and they fixed it right away.', date: '2023-10-12' },
    { customerName: 'Geeta H.', rating: 5, comment: 'The taste of the milk reminds me of my village. Absolutely pure.', date: '2023-10-11' },
];


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected for Seeding...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();
        await Conversion.deleteMany();
        await StaffActivity.deleteMany();
        await SupportTicket.deleteMany();
        await MilkIntake.deleteMany();

        const createdUsers = await User.insertMany(MOCK_USERS_DATA);
        const products = await Product.insertMany(MOCK_PRODUCTS_DATA);
        await Review.insertMany(MOCK_REVIEWS_DATA);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

connectDB().then(() => {
    importData();
});
