import React from 'react';

interface Testimonial {
    id: number;
    quote: string;
    customerName: string;
}

const Testimonials: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            quote: "This platform completely transformed the way I book bikes. Highly recommended!",
            customerName: "John Doe",
        },
        {
            id: 2,
            quote: "Fantastic service! The bike was in great condition and the process was seamless.",
            customerName: "Jane Smith",
        },
        {
            id: 3,
            quote: "Amazing experience! I love how easy it is to find and rent a bike through this platform.",
            customerName: "David Brown",
        },

    ];

    return (
        <div className="testimonials bg-gray-100 p-16">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-10">What Our Customers Say</h2>
                <div className="testimonial-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="testimonial-item bg-white p-6 rounded-lg shadow-md"
                        >
                            <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                            <h3 className="text-lg font-semibold text-right">- {testimonial.customerName}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
