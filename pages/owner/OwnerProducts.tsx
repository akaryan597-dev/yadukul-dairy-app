
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';
import { Product, ProductType, ProductUnit } from '../../types';

const OwnerProducts: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct, loading } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'stock'>>({
        name: '',
        type: ProductType.COW_MILK,
        price: 0,
        unit: ProductUnit.LITRE,
        imageUrl: '',
    });

    const handleOpenModal = (product: Product | null = null) => {
        setEditingProduct(product);
        if (product) {
            setNewProduct(product);
        } else {
             setNewProduct({
                name: '',
                type: ProductType.COW_MILK,
                price: 0,
                unit: ProductUnit.LITRE,
                imageUrl: `https://picsum.photos/400/300?random=${Date.now()}`,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // In a real app, you would upload the file and get a URL.
            // Here, we'll just use a placeholder URL.
            setNewProduct(prev => ({...prev, imageUrl: URL.createObjectURL(e.target.files[0])}));
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            await updateProduct({ ...editingProduct, ...newProduct });
        } else {
            await addProduct({ ...newProduct, stock: 0 });
        }
        handleCloseModal();
    };
    
    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    }

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Manage Products</h1>
                <button onClick={() => handleOpenModal()} className="bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                    Add Product
                </button>
            </div>
            {loading ? <p>Loading products...</p> : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-700 text-left text-gray-300 uppercase text-sm">
                            <th className="p-4">Image</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Unit</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="p-4"><img src={product.imageUrl} alt={product.name} className="h-16 w-16 object-cover rounded-md" /></td>
                                <td className="p-4 font-medium">{product.name}</td>
                                <td className="p-4">{product.type}</td>
                                <td className="p-4">₹{product.price.toFixed(2)}</td>
                                <td className="p-4">per {product.unit}</td>
                                <td className="p-4">
                                    <button onClick={() => handleOpenModal(product)} className="text-brand-gold hover:text-yellow-300 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
             {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Product Name" required className="bg-gray-700 p-2 rounded" />
                                <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" required className="bg-gray-700 p-2 rounded" />
                                <select name="type" value={newProduct.type} onChange={handleInputChange} className="bg-gray-700 p-2 rounded">
                                    {Object.values(ProductType).map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                                <select name="unit" value={newProduct.unit} onChange={handleInputChange} className="bg-gray-700 p-2 rounded">
                                    {Object.values(ProductUnit).map(unit => <option key={unit} value={unit}>{unit}</option>)}
                                </select>
                                <div className="col-span-2">
                                     <label className="block text-sm font-medium text-gray-300 mb-1">Product Image</label>
                                     <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-blue-700"/>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button type="button" onClick={handleCloseModal} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                <button type="submit" className="bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default OwnerProducts;
