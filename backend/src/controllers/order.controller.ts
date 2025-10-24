
// FIX: Use direct imports for Express types.
import { Request, Response } from 'express';
import Order from '../models/order.model';

// FIX: Use Request and Response for correct typing.
export const createOrder = async (req: Request, res: Response) => {
    const { productId, quantity, customerInfo, frequency } = req.body;
    
    const order = new Order({
        productId,
        quantity,
        customerId: req.user!.id,
        customerInfo,
        frequency,
        status: 'Pending',
        orderDate: new Date(),
        deliveryDate: new Date(Date.now() + 86400000), // Set for next day
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
};

// FIX: Use Request and Response for correct typing.
export const getOrders = async (req: Request, res: Response) => {
    const orders = await Order.find({}).populate('productId', 'name unit price').populate('customerId', 'name');
    res.json(orders);
};

// FIX: Use Request and Response for correct typing.
export const updateOrderStatus = async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};
