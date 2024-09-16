import React from 'react';
import { useGetBikesQuery } from '../../redux/api/api';
import { Link } from 'react-router-dom';
interface Bike {
    _id: string;
    name: string;
    description: string;
    pricePerHour: number;
    cc: number;
    year: number;
    model: string;
    brand: string;
    isAvailable: boolean;
    image?: string;
}

const Feature: React.FC = () => {
    const { data: bikes } = useGetBikesQuery({});

    return (
        <div className="feature-section py-16 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-10">Featured Bikes</h2>
                <div className=" mx-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bikes?.data.slice(0, 4).map((bike: Bike) => (
                        <div key={bike._id} className="bike-card bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={bike.image || '/bike.avif'}
                                alt={bike.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{bike.name}</h3>
                                <p className="text-gray-600">Brand: {bike.brand}</p>
                                <p className="text-gray-600">Price Per Hour: {bike.pricePerHour} BDT</p>
                                <Link to={`/bike/${bike._id}`}>
                                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none w-full text-center">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feature;
