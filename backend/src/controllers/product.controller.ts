
import { Request, Response } from 'express';
import Product from '../models/product.model';

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.find({});
    res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, type, price, unit, imageUrl, stock } = req.body;
    const product = new Product({ name, type, price, unit, imageUrl, stock });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

export const updateProduct = async (req: Request, res: Response) => {
    const { name, type, price, unit, imageUrl, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.type = type;
        product.price = price;
        product.unit = unit;
        product.imageUrl = imageUrl;
        product.stock = stock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};
