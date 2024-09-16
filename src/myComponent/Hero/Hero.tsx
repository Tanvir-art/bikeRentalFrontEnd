import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {

        if (searchQuery.trim()) {
            navigate(`/bikeList?search=${encodeURIComponent(searchQuery)}`);
        }

    };

    return (
        <div
            className="relative bg-cover bg-center h-screen flex items-center justify-center"
            style={{
                backgroundImage: "url('/hero.jpg')", // Update with your image path
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Find Your Perfect Bike
                </h1>
                <p className="text-xl md:text-2xl mb-6">
                    Discover the best bikes available for you
                </p>

                {/* Search Bar */}
                <div className="hero-section">
                    {/* Other content */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for bikes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border border-gray-300 rounded text-gray-800"
                        />
                        <button
                            onClick={handleSearch}
                            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
