import React from "react";
import { FaDollarSign, FaBicycle, FaHeadset } from "react-icons/fa";

const WhyChooseUs: React.FC = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8">
                    Why Choose Us?
                </h2>
                <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
                    {/* Best Prices */}
                    <div className="flex flex-col items-center max-w-xs text-center">
                        <FaDollarSign size={48} className="text-blue-700 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                        <p className="text-gray-700">
                            We offer competitive pricing on all our bikes, ensuring you get the best value for your money.
                        </p>
                    </div>

                    {/* Wide Selection */}
                    <div className="flex flex-col items-center max-w-xs text-center">
                        <FaBicycle size={48} className="text-blue-700 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                        <p className="text-gray-700">
                            Choose from a wide range of bikes, whether you're looking for something for leisure or for sport.
                        </p>
                    </div>

                    {/* Excellent Customer Service */}
                    <div className="flex flex-col items-center max-w-xs text-center">
                        <FaHeadset size={48} className="text-blue-700 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Excellent Customer Service</h3>
                        <p className="text-gray-700">
                            Our friendly customer service team is here to help you with any questions or concerns you may have.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
