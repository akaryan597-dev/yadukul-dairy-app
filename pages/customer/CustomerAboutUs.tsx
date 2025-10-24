import React from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.956c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.783.57-1.838-.197-1.539-1.118l1.286-3.956a1 1 0 00-.364-1.118L2.064 9.383c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
            ))}
        </div>
    );
};

const CustomerAboutUs: React.FC = () => {
    const { reviews, loading } = useData();

    return (
        <div>
            <div 
                className="relative bg-cover bg-center rounded-xl p-8 md:p-16 mb-8 text-white shadow-lg"
                style={{ backgroundImage: "url('https://picsum.photos/1200/400?image=1069')" }}
            >
                <div className="absolute inset-0 bg-black opacity-60 rounded-xl"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Yadukul Dairy</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        Yadukul Dairy Private Limited, based in Noida, is committed to providing the purest and freshest dairy products directly from our farm to your family. We believe in tradition, quality, and the well-being of our customers and our cattle.
                    </p>
                </div>
            </div>

            <Card>
                <h2 className="text-3xl font-bold text-white mb-6 text-center">What Our Customers Say</h2>
                {loading ? <p className="text-center">Loading reviews...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map(review => (
                            <div key={review.id} className="bg-gray-700 p-6 rounded-lg flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center font-bold text-xl mr-4">
                                        {review.customerName.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">{review.customerName}</h4>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <p className="text-gray-300 italic">"{review.comment}"</p>
                                <p className="text-xs text-gray-500 mt-auto pt-4 text-right">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default CustomerAboutUs;