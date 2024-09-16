import React from 'react';
import { useDeleteUserByAdminMutation, useGetAlluserByAdminQuery, useUpdateUserByAdminMutation } from '../../../redux/api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
}

const UserManagementPage: React.FC = () => {
    const { data, error, isLoading } = useGetAlluserByAdminQuery({});
    const [updateUserByAdmin] = useUpdateUserByAdminMutation();
    const [deleteUserByAdmin] = useDeleteUserByAdminMutation();

    const handleDelete = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {

            const result = await deleteUserByAdmin(userId).unwrap();
            console.log(result)
            toast('User deleted successfully');

        }
    };

    const handlePromote = async (userId: string) => {
        try {
            // Ensure userId is correctly passed and not undefined
            if (!userId) {
                console.error("No userId provided");
                return;
            }

            const data = {
                _id: userId, // Ensure userId is correctly used here
                role: 'admin', // The new role you want to assign
            };

            // Debugging: Log the data before calling the mutation
            console.log('Sending data to API:', data);

            const res = await updateUserByAdmin(data).unwrap();

            // Handle success response
            console.log('Response:', res);
            toast('User promoted to admin successfully');
        } catch (error) {
            console.error('Error promoting user:', error);
            toast('Error promoting user. Please try again.');
        }
    };


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div className="  mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">User Management</h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-2 border-b text-left">Name</th>
                            <th className="p-2 border-b text-left">Email</th>
                            <th className="p-2 border-b text-left">Role</th>
                            <th className="p-2 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((user: User) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="p-2 border-b">{user.name}</td>
                                <td className="p-2 border-b">{user.email}</td>
                                <td className="p-2 border-b">{user.role}</td>
                                <td className="p-2 border-b">
                                    <div className="flex space-x-2">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => handlePromote(user._id)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Promote to Admin
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagementPage;

