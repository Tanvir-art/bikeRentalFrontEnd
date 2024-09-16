import React, { useState } from 'react';
import { useAddBikeMutation, useDeleteBikeMutation, useGetBikesQuery, useUpdateBikeMutation } from '../../../redux/api/api';
import { toast } from 'react-toastify';

interface Bike {
    _id: string;
    name: string;
    description: string;
    pricePerHour: number;
    isAvailable: boolean;
    cc: number;
    year: number;
    model: string;
    brand: string;
    imageUrl?: string;
}

const BikeManagementPage: React.FC = () => {
    const [addBike] = useAddBikeMutation();
    const { data } = useGetBikesQuery({});
    const [updateBike] = useUpdateBikeMutation();
    const [deleteBike] = useDeleteBikeMutation()
    const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
    const [formData, setFormData] = useState<Omit<Bike, '_id'>>({
        name: '',
        description: '',
        brand: '',
        model: '',
        pricePerHour: 0,
        isAvailable: true,
        cc: 0,
        year: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'pricePerHour' || name === 'cc' || name === 'year' ? Number(value) : value,
        }));
    };

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedBike) {
            const updateData = {
                _id: selectedBike._id,
                ...formData
            }
            console.log(updateData)
            const result = await updateBike(updateData);
            toast("Bike Updated Successfully", { type: "success" });
            console.log(result)
        } else {
            const res = await addBike(formData);
            toast("Bike Created Successfully", { type: "success" });
            console.log(res)
        }
        setFormData({ name: '', description: '', brand: '', model: '', pricePerHour: 0, isAvailable: true, cc: 0, year: 0 });
        setSelectedBike(null); // Reset selected bike after submission
    };

    const handleUpdate = (bike: Bike) => {
        setSelectedBike(bike);
        setFormData({
            name: bike.name,
            description: bike.description,
            brand: bike.brand,
            model: bike.model,
            pricePerHour: bike.pricePerHour,
            isAvailable: bike.isAvailable,
            cc: bike.cc,
            year: bike.year
        });
    };

    const handleDelete = async (id: string) => {
        await deleteBike(id);
        toast("Bike Deleted Successfully", { type: "success" });

    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bike Management</h1>

            {/* Modal with form fields to create/update bike */}
            <div>
                <h2 className="text-xl font-bold mb-2">
                    {selectedBike ? 'Edit Bike' : 'Create Bike'}
                </h2>
                <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                    <div>
                        <label className="block">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block">Model</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block">Price</label>
                        <input
                            type="number"
                            name="pricePerHour"
                            value={formData.pricePerHour}
                            onChange={handleInputChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block">CC</label>
                        <input
                            type="number"
                            name="cc"
                            value={formData.cc}
                            onChange={handleInputChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block">Year</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <button type="submit" className="p-2 bg-green-500 text-white rounded">
                        {selectedBike ? 'Update Bike' : 'Create Bike'}
                    </button>
                </form>
            </div>

            {/* Bike List */}
            <ul className="my-6">
                {data?.data?.map((bike: Bike) => (
                    <li key={bike._id} className="mb-2 p-2 bg-gray-200 rounded flex justify-between items-center">
                        <img
                            src={bike.imageUrl || '/bike.avif'}
                            alt={bike.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-grow">
                            Name: {bike.name} - Brand: {bike.brand} - Model: {bike.model} - Price: {bike.pricePerHour}
                        </div>
                        <div>
                            <button
                                onClick={() => handleUpdate(bike)}
                                className="mr-2 p-2 bg-yellow-500 text-white rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(bike._id)}
                                className="p-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BikeManagementPage;
