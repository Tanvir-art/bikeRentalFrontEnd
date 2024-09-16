import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

// Example data (replace with actual data)
const teamMembers = [
    {
        name: 'John Doe',
        role: 'Founder & CEO',
        photoUrl: '/images/john_doe.jpg',
        bio: 'John is the visionary behind the platform, with over 20 years of experience in the industry.',
    },
    {
        name: 'Jane Smith',
        role: 'CTO',
        photoUrl: '/images/jane_smith.jpg',
        bio: 'Jane is responsible for the technological direction, with a passion for innovation and development.',
    },
];

const milestones = [
    { year: '2020', event: 'Platform Launched' },
    { year: '2021', event: 'Reached 10,000 Users' },
    { year: '2022', event: 'Expanded to 5 new countries' },
];

const AboutUsPage: React.FC = () => {
    return (
        <div className="about-us-page py-20 px-6 max-w-7xl mx-auto">
            {/* Mission Statement */}
            <section className="mission-statement text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700">
                    Our mission is to provide a platform that connects people with the
                    resources they need to achieve their goals. We are committed to
                    innovation, integrity, and community building.
                </p>
            </section>

            {/* Team Section */}
            <section className="team-section mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
                <div className="flex flex-wrap justify-center">
                    {teamMembers.map((member) => (
                        <div
                            key={member.name}
                            className="team-member bg-white p-6 rounded-lg shadow-lg m-4 max-w-xs text-center transition-transform transform hover:scale-105"
                        >
                            <img
                                src={member.photoUrl}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                            <p className="text-blue-600 mb-2">{member.role}</p>
                            <p className="text-gray-700">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* History & Milestones */}
            <section className="history-section mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
                <div className="timeline relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full"></div>
                    {milestones.map((milestone, index) => (
                        <div
                            key={milestone.year}
                            className={`milestone flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                                }`}
                        >
                            <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                <h4 className="text-xl font-semibold text-blue-600">
                                    {milestone.year}
                                </h4>
                                <p className="text-gray-700">{milestone.event}</p>
                            </div>
                            <div
                                className={`timeline-icon w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 ${index % 2 === 0 ? 'translate-y-0' : '-translate-y-0'
                                    }`}
                            >
                                <IoMdCheckmarkCircleOutline size={24} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Information */}
            <section className="contact-info text-center">
                <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                <div className="flex flex-col items-center space-y-4">
                    <p className="flex items-center text-lg text-gray-700">
                        <FaMapMarkerAlt className="mr-2 text-blue-600" /> 123 Main Street, City, Country
                    </p>
                    <p className="flex items-center text-lg text-gray-700">
                        <FaPhoneAlt className="mr-2 text-blue-600" /> +123-456-7890
                    </p>
                    <p className="flex items-center text-lg text-gray-700">
                        <FaEnvelope className="mr-2 text-blue-600" /> info@organization.com
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
