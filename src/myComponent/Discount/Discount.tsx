import React from 'react';
import { useGetCouponQuery } from '../../redux/api/api';

interface Coupon {
    _id: string;
    code: string;
    discount: string;
    description: string;
}



const CouponsDiscounts: React.FC = () => {
    const { data } = useGetCouponQuery({});
    return (
        <div className="p-6 bg-blue-600   shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Coupons & Discounts</h2>
            <ul className="space-y-4">
                {data?.data?.map((coupon: Coupon) => (
                    <li key={coupon._id} className="p-4 bg-blue-500 rounded-md">
                        <h3 className="text-xl font-semibold">{coupon.code}</h3>
                        <p className="text-green-300">{coupon.discount}</p>
                        <p>You Will Get Coupon Automatically When Booking</p>
                    </li>
                ))}
            </ul>
            <div className="mt-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">How to Apply Coupons:</h3>
                <p>
                    To apply a coupon code, enter the code in the coupon field during checkout and click "Apply". The discount will be automatically deducted from your total.
                </p>
            </div>
        </div>
    );
};

export default CouponsDiscounts;
