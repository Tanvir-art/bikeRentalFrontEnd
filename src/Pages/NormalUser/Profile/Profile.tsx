import React, { useState, useEffect } from 'react';
import { useUpdateUserByOwnMutation, useUsersMeQuery } from '../../../redux/api/api';
import { useAppDispatch } from '../../../redux/hooks';
import { loginUser as loginUserAction } from '../../../redux/features/loginSlice';
import { toast } from 'react-toastify';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<UserProfile>({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const { data, refetch } = useUsersMeQuery({});
    const [updateUserByOwn] = useUpdateUserByOwnMutation();
    const userData = data?.data;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData]);

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Send update request to the backend
            const res = await updateUserByOwn({ ...user }).unwrap();
            const updatedData = res?.data;

            // Retain the current token from local storage or Redux state
            const currentToken = localStorage.getItem('user')
                ? JSON.parse(localStorage.getItem('user')!).token
                : userData?.token;

            // Combine updated data with the current token
            const updateWithToken = {
                ...updatedData,
                token: currentToken
            };

            // Update the Redux state with the new user data but keep the token unchanged
            dispatch(loginUserAction(updateWithToken));

            // Update local storage with the new user data but keep the token unchanged
            localStorage.setItem('user', JSON.stringify(updateWithToken));
            toast("Profile updated successfully");
            // Refetch the updated user data to ensure the frontend stays in sync with the backend
            refetch();

            // Stop editing mode
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };
    ;

    return (
        <div className="    flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                    Welcome, {user?.name}!
                </h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Profile Information</h2>
                    {!isEditing ? (
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-600 w-32">Name:</span>
                                <span className="text-gray-700">{user?.name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-600 w-32">Email:</span>
                                <span className="text-gray-700">{user?.email}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-600 w-32">Phone:</span>
                                <span className="text-gray-700">{user?.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-600 w-32">Address:</span>
                                <span className="text-gray-700">{user?.address}</span>
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-600">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-600">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleChange}
                                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-600">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={user.address}
                                    onChange={handleChange}
                                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
