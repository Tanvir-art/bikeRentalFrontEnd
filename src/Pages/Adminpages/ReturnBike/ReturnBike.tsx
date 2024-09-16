import { toast } from "react-toastify";
import { useClaculatePaymentMutation, useGetRentalsBikeQuery } from "../../../redux/api/api";

interface Rental {
    _id: string;
    userId: string;
    bikeId: string;
    startTime: string;
    returnTime: string | null;
    totalCost: number;
    isReturned: boolean;
    paymentStatus: string;

}

const ReturnBike = () => {
    const { data: rentals, isLoading, error } = useGetRentalsBikeQuery({});
    const [claculatePayment] = useClaculatePaymentMutation();


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching rentals</div>;
    }

    const handleCalculate = async (rental: Rental) => {
        // Calculation logic goes here, such as calculating the total rental cost


        const res = await claculatePayment(rental._id);
        toast("Payment Calculated Successfully", { type: "success" });
        console.log(res)
    };
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Return Bikes</h1>
            {rentals?.data && rentals?.data.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rentals?.data.map((rental: Rental) => (
                        <li key={rental._id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-semibold">Rental ID: {rental._id}</h2>
                            <p className="text-gray-600">User ID: {rental.userId}</p>
                            <p className="text-gray-600">Bike ID: {rental.bikeId}</p>
                            <p className="text-gray-600">Start Time: {new Date(rental.startTime).toLocaleString()}</p>
                            <p className="text-gray-600">
                                Return Time: {rental.returnTime ? new Date(rental.returnTime).toLocaleString() : "Not returned"}
                            </p>
                            <p className="text-gray-600">Total Cost: ${rental.totalCost}</p>
                            <p className="text-gray-600">Payment Status: {rental.paymentStatus}</p>
                            <p className={`text-gray-600 ${rental.isReturned ? 'text-green-500' : 'text-red-500'}`}>
                                {rental.isReturned ? 'Returned' : 'Not Returned'}
                            </p>
                            <button
                                onClick={() => handleCalculate(rental)}
                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Calculate
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No rentals found.</div>
            )}
        </div>
    );
};

export default ReturnBike;
