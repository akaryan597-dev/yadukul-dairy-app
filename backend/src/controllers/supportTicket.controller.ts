
import { Request, Response } from 'express';
import SupportTicket from '../models/supportTicket.model';

export const createSupportTicket = async (req: Request, res: Response) => {
    const { subject, message } = req.body;
    const ticket = new SupportTicket({
        subject,
        message,
        customerId: req.user!.id,
        customerName: req.user!.name,
    });
    const createdTicket = await ticket.save();
    res.status(201).json(createdTicket);
};

export const getSupportTickets = async (req: Request, res: Response) => {
    const tickets = await SupportTicket.find({}).sort({ date: -1 });
    res.json(tickets);
};
