import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    isAvailable?: boolean;
    image?: string;
}

const BikeListingPage: React.FC = () => {
    const location = useLocation();
    const { data } = useGetBikesQuery({});
    const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);

    // State for filters
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [availabilityFilter, setAvailabilityFilter] = useState<string>('');

    // Extract query param from URL
    const getQueryParam = (param: string) => {
        const params = new URLSearchParams(location.search);
        return params.get(param) || '';
    };

    useEffect(() => {
        // Get the search query from URL
        const searchQuery = getQueryParam('search').toLowerCase();

        // Filter bikes based on search query, brand, model, and availability
        const filteredResults = data?.data
            ?.filter((bike: Bike) =>
                bike.name.toLowerCase().includes(searchQuery) ||
                bike.description.toLowerCase().includes(searchQuery)
            )
            ?.filter((bike: Bike) => {
                return (
                    (!selectedBrand || bike.brand === selectedBrand) &&
                    (!selectedModel || bike.model === selectedModel) &&
                    (!availabilityFilter || (availabilityFilter === 'available' && bike.isAvailable) ||
                        (availabilityFilter === 'unavailable' && !bike.isAvailable))
                );
            });

        setFilteredBikes(filteredResults || []);
    }, [data, location.search, selectedBrand, selectedModel, availabilityFilter]);

    // Extract unique brand and model options from the bike data
    const brandOptions: string[] = Array.from(new Set(data?.data?.map((bike: Bike) => bike.brand))) as string[];
    const modelOptions: string[] = Array.from(new Set(data?.data?.map((bike: Bike) => bike.model))) as string[];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Bikes</h1>

            {/* Search Query Display */}
            <div className="mb-6 text-center">
                {getQueryParam('search') && (
                    <p className="text-gray-700">
                        Showing results for <strong>{getQueryParam('search')}</strong>
                    </p>
                )}
            </div>

            {/* Filters */}
            <div className="mb-6 flex justify-center space-x-4">
                {/* Brand Filter */}
                <select
                    className="px-4 py-2 border rounded"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">All Brands</option>
                    {brandOptions.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                    ))}
                </select>

                {/* Model Filter */}
                <select
                    className="px-4 py-2 border rounded"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                >
                    <option value="">All Models</option>
                    {modelOptions.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}
                </select>

                {/* Availability Filter */}
                <select
                    className="px-4 py-2 border rounded"
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                    <option value="">All Availability</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                </select>
            </div>

            {/* Bike List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBikes.length > 0 ? (
                    filteredBikes.map((bike: Bike) => (
                        <div key={bike._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={bike.image || '/bike.avif'}
                                alt={bike.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{bike.name}</h2>
                                <p className="text-gray-700 mb-2"><strong>Description:</strong> {bike.description}</p>
                                <p className="text-gray-700 mb-2"><strong>Price per Hour:</strong> ${bike.pricePerHour}</p>
                                <p className="text-gray-700 mb-2"><strong>CC:</strong> {bike.cc}</p>
                                <p className="text-gray-700 mb-2"><strong>Year:</strong> {bike.year}</p>
                                <p className="text-gray-700 mb-2"><strong>Model:</strong> {bike.model}</p>
                                <p className="text-gray-700 mb-2"><strong>Brand:</strong> {bike.brand}</p>
                                <p className="text-gray-700 mb-2"><strong>Availability:</strong> {bike?.isAvailable ? 'Available' : 'Unavailable'}</p>
                                <Link to={`/bike/${bike._id}`}>
                                    <button
                                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                                    >
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-700">No bikes found matching the search criteria.</p>
                )}
            </div>
        </div>
    );
};

export default BikeListingPage;
