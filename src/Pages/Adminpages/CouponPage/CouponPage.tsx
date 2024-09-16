import React, { useState } from 'react';
import { useAddCouponMutation, useDeleteCouponMutation, useGetCouponQuery } from '../../../redux/api/api';
import { toast } from 'react-toastify';

interface Coupon {
    _id: number;
    code: string;
    expiryDate: string;
    discount: number;
}

const CouponManagement: React.FC = () => {
    const [code, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [expiryDate, setExpiryDate] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [addCoupon] = useAddCouponMutation();
    const { data } = useGetCouponQuery({});
    const coupon = data?.data;
    const [deleteCoupon] = useDeleteCouponMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const couponData = {
            code,
            discount,
            expiryDate,
            isActive,
        };

        const res = await addCoupon(couponData);
        console.log('Coupon Data:', couponData);
        console.log(res);
        // Clear form after submission
        setCouponCode('');
        setDiscount(0);
        setExpiryDate('');
        setIsActive(false);
        toast("Coupon Created Successfully", { type: "success" });
    };

    const handleDeleteCoupon = async (id: number) => {
        const res = await deleteCoupon(id);
        toast("Coupon Deleted Successfully", { type: "success" });
        console.log(res);
    };

    return (
        <div className="coupon-management bg-white p-6 rounded-lg shadow-md   mx-auto">
            <h2 className="text-xl font-bold mb-4">Coupon Management</h2>
            <div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Create Coupon</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="couponCode">
                            Coupon Code
                        </label>
                        <input
                            type="text"
                            id="couponCode"
                            value={code}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter coupon code"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="discount">
                            Discount (%)
                        </label>
                        <input
                            type="number"
                            id="discount"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter discount percentage"
                            min="0"
                            max="100"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="expiryDate">
                            Expiry Date
                        </label>
                        <input
                            type="date"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Active Status</label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="isActive" className="ml-2 text-gray-700">
                                Is Active?
                            </label>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Create Coupon
                        </button>
                    </div>
                </form>
            </div>


            <div className="coupon-list my-4">
                {coupon?.length > 0 ? (
                    coupon.map((coupon: Coupon) => (
                        <div
                            key={coupon._id}
                            className="coupon-item flex justify-between items-center p-4 mb-2 border border-gray-200 rounded-lg"
                        >
                            <span className="font-semibold">{coupon.code}</span>
                            <span className="text-gray-700">{coupon.discount}% Off</span>
                            <button
                                onClick={() => handleDeleteCoupon(coupon._id)}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No coupons available.</p>
                )}
            </div>
        </div>
    );
};

export default CouponManagement;
