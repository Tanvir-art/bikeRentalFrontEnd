import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdvancePaymentMutation, useGetBikesQuery, useGetCouponQuery } from '../../redux/api/api';

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
interface Coupon {
    _id: number;

    discount: number;
}

const SingleBikePage: React.FC = () => {
    const [advancePayment] = useAdvancePaymentMutation();
    const { bikeId } = useParams(); // Get bike ID from URL parameters
    const { data: bike } = useGetBikesQuery({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startTime, setStartTime] = useState('');
    const navigate = useNavigate();
    const bikeFilter = bike?.data?.filter((bike: Bike) => bike?._id === bikeId);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleBookNow = () => {
        if (!user || !user.token) {
            // Redirect to login page if user is not logged in
            navigate('/login');
        } else {
            // Proceed with booking if the user is logged in
            openModal();
        }
    };
    const { data: coupon } = useGetCouponQuery({});
    console.log(coupon?.data);
    const handleConfirmBooking = async () => {
        if (bikeId && startTime) {
            const discount = coupon?.data?.length ? coupon.data[0].discount : 0;
            try {
                const result = await advancePayment({
                    bikeId,
                    startTime,
                    discount,
                }).unwrap();
                console.log('Booking confirmed:', result);
                window.location.href = result?.data?.paymentUrl;
            } catch (error) {
                console.error('Error confirming booking:', error);
            }
        }
        closeModal(); // Close the modal
    };



    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {bikeFilter ? (
                bikeFilter.map((bike: Bike) => (
                    <div key={bike?._id} className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="relative">
                            {/* Coupon section */}
                            {coupon?.data && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                                    {coupon?.data?.map((coupon: Coupon) => coupon?.discount)}% OFF
                                </div>
                            )}

                            {/* Bike Image */}
                            <img
                                src={bike.image || '/bike.avif'}
                                alt={bike.name}
                                className="w-full h-64 object-cover"
                            />
                        </div>

                        {/* Bike Details */}
                        <div className="p-6">
                            <h1 className="text-4xl font-bold mb-4 text-gray-900">{bike?.name}</h1>
                            <p className="text-gray-700 mb-4"><strong>Description:</strong> {bike?.description}</p>
                            <p className="text-gray-700 mb-4"><strong>Price per Hour:</strong> ${bike?.pricePerHour}</p>
                            <p className="text-gray-700 mb-4"><strong>CC:</strong> {bike?.cc}</p>
                            <p className="text-gray-700 mb-4"><strong>Year:</strong> {bike?.year}</p>
                            <p className="text-gray-700 mb-4"><strong>Model:</strong> {bike?.model}</p>
                            <p className="text-gray-700 mb-4"><strong>Brand:</strong> {bike?.brand}</p>
                            <p className="text-gray-700 mb-4">
                                <strong>Availability:</strong> {bike?.isAvailable ? 'Available' : 'Not Available'}
                            </p>
                            <button
                                onClick={handleBookNow}
                                className="mt-6 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-700">Loading bike details...</p>
            )}

            {/* Modal for booking */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Book Bike</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Start Time:</label>
                            <input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="mt-1 p-2 w-full border rounded"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleConfirmBooking}
                                className="bg-blue-600 text-white py-2 px-4 rounded mr-2 hover:bg-blue-700 transition duration-300"
                            >
                                Confirm Booking
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleBikePage;
