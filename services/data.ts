import { User, Role, Product, ProductType, ProductUnit, Order, OrderStatus, SubscriptionFrequency, CustomerInfo, StaffActivity, Conversion, MilkIntake, SupportTicket, Review } from '../types';

export const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Ramesh Kumar', role: Role.OWNER, username: 'owner' },
    { id: 'user-2', name: 'Suresh Singh', role: Role.STAFF, username: 'staff1' },
    { id: 'user-3', name: 'Amit Patel', role: Role.CUSTOMER, username: 'customer1' },
    { id: 'user-4', name: 'Priya Sharma', role: Role.CUSTOMER, username: 'customer2' },
    { id: 'user-5', name: 'Vikas Gupta', role: Role.STAFF, username: 'staff2' },
];

export let MOCK_PRODUCTS: Product[] = [
    { id: 'prod-1', name: 'Cow Milk', type: ProductType.COW_MILK, price: 55, unit: ProductUnit.LITRE, imageUrl: 'https://picsum.photos/400/300?image=883', stock: 1000 },
    { id: 'prod-2', name: 'Buffalo Milk', type: ProductType.BUFFALO_MILK, price: 65, unit: ProductUnit.LITRE, imageUrl: 'https://picsum.photos/400/300?image=1069', stock: 800 },
    { id: 'prod-3', name: 'Fresh Curd', type: ProductType.CURD, price: 80, unit: ProductUnit.KG, imageUrl: 'https://picsum.photos/400/300?image=292', stock: 150 },
    { id: 'prod-4', name: 'Paneer', type: ProductType.PANEER, price: 350, unit: ProductUnit.KG, imageUrl: 'https://picsum.photos/400/300?image=985', stock: 100 },
];

const customer1Info: CustomerInfo = { name: 'Amit Patel', street: '123, Sector 18', city: 'Noida', pin: '201301', contactNumber: '9876543210', whatsappNumber: '9876543210' };
const customer2Info: CustomerInfo = { name: 'Priya Sharma', street: '456, Gaur City', city: 'Noida', pin: '201309', contactNumber: '9988776655', whatsappNumber: '9988776655' };

// Helper to get current date in YYYY-MM format, so the inventory page shows data.
const currentMonth = new Date().toISOString().slice(0, 7);

export let MOCK_ORDERS: Order[] = [
    { id: 'order-1', productId: 'prod-1', quantity: 2, customerId: 'user-3', customerInfo: customer1Info, status: OrderStatus.DELIVERED, orderDate: new Date(new Date().setDate(new Date().getDate() - 25)).toISOString(), deliveryDate: `${currentMonth}-01`, frequency: SubscriptionFrequency.DAILY, routeNotes: 'Leave at front door' },
    { id: 'order-2', productId: 'prod-2', quantity: 1, customerId: 'user-4', customerInfo: customer2Info, status: OrderStatus.DELIVERED, orderDate: new Date(new Date().setDate(new Date().getDate() - 24)).toISOString(), deliveryDate: `${currentMonth}-02`, frequency: SubscriptionFrequency.DAILY },
    { id: 'order-3', productId: 'prod-3', quantity: 0.5, customerId: 'user-3', customerInfo: customer1Info, status: OrderStatus.PENDING, orderDate: new Date().toISOString(), deliveryDate: new Date(Date.now() + 86400000).toISOString().slice(0,10), frequency: SubscriptionFrequency.ONCE },
    { id: 'order-4', productId: 'prod-1', quantity: 1, customerId: 'user-4', customerInfo: customer2Info, status: OrderStatus.PENDING, orderDate: new Date().toISOString(), deliveryDate: new Date(Date.now() + 86400000).toISOString().slice(0,10), frequency: SubscriptionFrequency.WEEKLY },
    { id: 'order-5', productId: 'prod-4', quantity: 1, customerId: 'user-3', customerInfo: customer1Info, status: OrderStatus.CANCELLED, orderDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), deliveryDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().slice(0,10), frequency: SubscriptionFrequency.ONCE },
    // more orders to make charts look good
    ...Array.from({ length: 15 }, (_, i) => ({
        id: `order-hist-${i}`,
        productId: MOCK_PRODUCTS[i % MOCK_PRODUCTS.length].id,
        quantity: i % 2 + 1,
        customerId: i % 2 === 0 ? 'user-3' : 'user-4',
        customerInfo: i % 2 === 0 ? customer1Info : customer2Info,
        status: OrderStatus.DELIVERED,
        orderDate: new Date(Date.now() - (i + 3) * 86400000).toISOString(),
        deliveryDate: new Date(Date.now() - (i + 3) * 86400000).toISOString().slice(0,10),
        frequency: SubscriptionFrequency.DAILY
    }))
];


export let MOCK_STAFF_ACTIVITIES: StaffActivity[] = [
    { id: 'act-1', staffId: 'user-2', staffName: 'Suresh Singh', action: 'Marked order order-1 as Delivered.', timestamp: new Date(new Date().setDate(new Date().getDate() - 25)).toISOString() },
    { id: 'act-2', staffId: 'user-2', staffName: 'Suresh Singh', action: 'Marked order order-2 as Delivered.', timestamp: new Date(new Date().setDate(new Date().getDate() - 24)).toISOString() },
];

export let MOCK_CONVERSIONS: Conversion[] = [
    { id: 'conv-1', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().slice(0,10), milkUsedLiters: 100, curdProducedKg: 20, paneerProducedKg: 10 },
    { id: 'conv-2', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0,10), milkUsedLiters: 120, curdProducedKg: 25, paneerProducedKg: 12 },
];

export let MOCK_MILK_INTAKE: MilkIntake[] = [
    { id: 'intake-1', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().slice(0,10), cowMilkLiters: 200, buffaloMilkLiters: 150 },
    { id: 'intake-2', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0,10), cowMilkLiters: 210, buffaloMilkLiters: 160 },
];

export let MOCK_SUPPORT_TICKETS: SupportTicket[] = [
    { id: 'ticket-1', customerId: 'user-3', customerName: 'Amit Patel', subject: 'Late delivery', message: 'My milk was delivered late today.', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), status: 'Closed' }
];

export let MOCK_REVIEWS: Review[] = [
    { id: 'rev-1', customerName: 'Anjali S.', rating: 5, comment: 'The best and freshest milk in Noida. Delivery is always on time!', date: '2023-10-25' },
    { id: 'rev-2', customerName: 'Vikram R.', rating: 5, comment: 'Paneer is so soft and delicious. My family loves it.', date: '2023-10-24' },
    { id: 'rev-3', customerName: 'Sunita M.', rating: 4, comment: 'Good quality curd, very thick. Sometimes the delivery is a bit late.', date: '2023-10-23' },
    { id: 'rev-4', customerName: 'Rajesh G.', rating: 5, comment: 'I have a daily subscription for buffalo milk, and the quality has been consistent. Highly recommended.', date: '2023-10-22' },
    { id: 'rev-5', customerName: 'Pooja T.', rating: 5, comment: 'Excellent customer service. They resolved my query very quickly.', date: '2023-10-21' },
    { id: 'rev-6', customerName: 'Deepak K.', rating: 4, comment: 'The cow milk tastes very natural. My kids love it.', date: '2023-10-20' },
    { id: 'rev-7', customerName: 'Neha B.', rating: 5, comment: 'Finally, a reliable dairy service in our area. Keep up the great work!', date: '2023-10-19' },
    { id: 'rev-8', customerName: 'Arun J.', rating: 5, comment: 'The quality of their products is unmatched. Very happy with the subscription.', date: '2023-10-18' },
    { id: 'rev-9', customerName: 'Kavita P.', rating: 3, comment: 'Milk is good, but the packaging could be better. Sometimes it leaks.', date: '2023-10-17' },
    { id: 'rev-10', customerName: 'Manoj V.', rating: 5, comment: 'Superb quality and always fresh. The best dairy farm in the city.', date: '2023-10-16' },
    { id: 'rev-11', customerName: 'Swati N.', rating: 5, comment: 'Their app is so easy to use for managing my subscription. Very convenient.', date: '2023-10-15' },
    { id: 'rev-12', customerName: 'Alok D.', rating: 4, comment: 'Great products. The paneer is a must-try!', date: '2023-10-14' },
    { id: 'rev-13', customerName: 'Rina S.', rating: 5, comment: 'I trust Yadukul Dairy for my family\'s daily needs. Pure and fresh.', date: '2023-10-13' },
    { id: 'rev-14', customerName: 'Sanjay C.', rating: 4, comment: 'Very responsive support team. I had an issue with my order and they fixed it right away.', date: '2023-10-12' },
    { id: 'rev-15', customerName: 'Geeta H.', rating: 5, comment: 'The taste of the milk reminds me of my village. Absolutely pure.', date: '2023-10-11' },
];