import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout: React.FC = () => {
    return (
        <>
            <div className='bg-gray-900 w-full'>
                <div className='text-white p-4 text-center text-xl font-bold'>Admin Dashboard</div>
            </div>
            <ToastContainer />
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <nav className="w-64 bg-gray-800 text-white p-6 hidden md:block">
                    <ul>
                        <li className="mb-4">
                            <NavLink to="/admin/profile" className="block p-2 hover:bg-gray-700 rounded">
                                Profile Management
                            </NavLink>
                        </li>
                        <li className="mb-4">
                            <NavLink to="/admin/bike-management" className="block p-2 hover:bg-gray-700 rounded">
                                Bike Management
                            </NavLink>
                        </li>
                        <li className="mb-4">
                            <NavLink to="/admin/user-management" className="block p-2 hover:bg-gray-700 rounded">
                                User Management
                            </NavLink>
                        </li>
                        <li className="mb-4">
                            <NavLink to="/admin/return-bike" className="block p-2 hover:bg-gray-700 rounded">
                                Return Bike
                            </NavLink>
                        </li>
                        <li className="mb-4">
                            <NavLink to="/admin/coupon-management" className="block p-2 hover:bg-gray-700 rounded">
                                Coupon Management
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Responsive Sidebar */}
                <nav className="bg-gray-800 text-white p-4 md:hidden">
                    <select
                        className="w-full bg-gray-800 text-white p-2 rounded"
                        onChange={(e) => window.location.href = e.target.value}
                    >
                        <option value="/admin/profile">Profile Management</option>
                        <option value="/admin/bike-management">Bike Management</option>
                        <option value="/admin/user-management">User Management</option>
                        <option value="/admin/return-bike">Return Bike</option>
                        <option value="/admin/coupon-management">Coupon Management</option>
                    </select>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </>

    );
};

export default AdminLayout;
