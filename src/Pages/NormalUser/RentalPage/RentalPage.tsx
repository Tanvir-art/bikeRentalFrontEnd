import React, { useState } from 'react';
import { useGetRentalsBikeQuery } from '../../../redux/api/api';

interface Rental {
    _id: string;
    userId: string;
    bikeId: string;
    //   bikeName: string; // Assuming bikeName is included in the response
    startTime: string;
    returnTime: string | null;
    totalCost: number;
    isReturned: boolean;
    paymentStatus: 'paid' | 'unpaid';
}

const RentalsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'paid' | 'unpaid'>('unpaid');
    const { data: rentals } = useGetRentalsBikeQuery({});
    console.log(rentals);

    const handlePay = (rentalId: string) => {
        console.log(`Processing payment for rental ID: ${rentalId}`);
        // Implement the payment logic here
    };

    return (
        <div className="rentals-page py-20">
            <div className="tabs flex mb-4">
                <button
                    className={`tab px-4 py-2 rounded-t-lg focus:outline-none ${activeTab === 'unpaid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                        }`}
                    onClick={() => setActiveTab('unpaid')}
                >
                    Unpaid
                </button>
                <button
                    className={`tab px-4 py-2 rounded-t-lg focus:outline-none ml-2 ${activeTab === 'paid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                        }`}
                    onClick={() => setActiveTab('paid')}
                >
                    Paid
                </button>
            </div>

            <div className="rentals-list bg-white p-6 rounded-lg shadow-md py-14">
                {rentals?.data
                    .filter((rental: Rental) => rental.paymentStatus === activeTab)
                    .map((rental: Rental) => (
                        <div
                            key={rental._id}
                            className="rental-item mb-4 p-4 border border-gray-200 rounded-lg"
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                Bike ID: {rental.bikeId}
                            </h3>
                            <h3 className="text-lg font-semibold mb-2">
                                User ID: {rental.userId}
                            </h3>
                            <p className="text-gray-700">
                                Start Time: {new Date(rental.startTime).toLocaleString()}
                            </p>
                            {rental.returnTime && (
                                <p className="text-gray-700">
                                    Return Time: {new Date(rental.returnTime).toLocaleString()}
                                </p>
                            )}
                            <p className="text-gray-700">Total Cost: {rental.totalCost} BDT</p>
                            {activeTab === 'unpaid' && (
                                <button
                                    onClick={() => handlePay(rental._id)}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                                >
                                    Pay
                                </button>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RentalsPage;
