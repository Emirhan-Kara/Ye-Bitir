import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const AboutUs = () => {
  const { theme } = useTheme();
  const colors = theme.colors;

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Emirhan Kara",
      role: "Head of Frontend Developers & Team Leader",
      image: "/api/placeholder/160/160",
      bio: "As a 3rd year Computer Engineering student at Kadir Has University, Emirhan leads the team and manages the frontend development, ensuring intuitive user experience for YeBitir's users."
    },
    {
      id: 2,
      name: "Hayrunnisa Çavdar",
      role: "Head of Backend Developers",
      image: "/api/placeholder/160/160",
      bio: "Hayrunnisa is a 3rd year Computer Engineering student at Kadir Has University who manages the backend infrastructure, ensuring the platform operates smoothly and securely."
    },
    {
      id: 3,
      name: "Mohammad Zaid",
      role: "Head of Testing",
      image: "/api/placeholder/160/160",
      bio: "A 3rd year Computer Engineering student at Kadir Has University, Mohammad ensures quality and reliability by implementing rigorous testing protocols for all aspects of the YeBitir platform."
    },
    {
      id: 4,
      name: "Rumeysa Kayam",
      role: "Head of Documentation",
      image: "/api/placeholder/160/160",
      bio: "Rumeysa is a 3rd year Computer Engineering student at Kadir Has University who meticulously documents the project's development, creates user guides, and ensures knowledge transfer within the team."
    }
  ];

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text.primary }} className="min-h-screen">
      {/* Hero section */}
      <div style={{ backgroundColor: colors.primary }} className="text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About YeBitir</h1>
          <p className="text-xl max-w-3xl mx-auto">Connecting food lovers with authentic, delicious recipes - A Software Engineering Project</p>
        </div>
      </div>

      {/* Our story section */}
      <div className="container mx-auto px-4 py-16">
        <h2 style={{ color: colors.primary }} className="text-3xl font-bold mb-6">Our Project</h2>
        <p className="text-lg" style={{ color: colors.text.secondary }}>
          YeBitir (meaning "Eat-it-Up" in Turkish) is a Software Engineering course project developed by 3rd year Computer Engineering students at Kadir Has University.
        </p>
      </div>

      {/* Team section */}
      <div className="container mx-auto px-4 py-16">
        <h2 style={{ color: colors.primary }} className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} style={{ backgroundColor: colors.cardBackground }} className="rounded-lg shadow overflow-hidden transition-transform hover:scale-105">
              <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 style={{ color: colors.primary }} className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm mb-4" style={{ color: colors.text.secondary }}>{member.role}</p>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Join us section */}
      <div style={{ backgroundColor: colors.primary, color: colors.text.light }} className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Join Our Culinary Community</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Whether you're a seasoned chef or a curious beginner, there's a place for you at YeBitir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/add-recipe" style={{ borderColor: colors.text.light, color: colors.text.light }} className="border-2 py-3 px-6 rounded-lg hover:bg-red-300">
              Share Recipes
            </Link>
            <Link to="/recipes" style={{ borderColor: colors.text.light, color: colors.text.light }} className="border-2 py-3 px-6 rounded-lg hover:bg-red-300">
              Explore Recipes
            </Link>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="container mx-auto px-4 py-16">
        <h2 style={{ color: colors.primary }} className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <div style={{ backgroundColor: colors.cardBackground }} className="p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Get In Touch</h3>
              <p style={{ color: colors.text.secondary }} className="mb-6">Have questions, suggestions, or feedback about our project? We'd love to hear from you!</p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span style={{ color: colors.primary }} className="mr-3">📍</span>
                  <span style={{ color: colors.text.secondary }}>Kadir Has University, Cibali, Istanbul, Turkey</span>
                </div>
                <div className="flex items-start">
                  <span style={{ color: colors.primary }} className="mr-3">📧</span>
                  <span style={{ color: colors.text.secondary }}>yebitir@khas.edu.tr</span>
                </div>
                <div className="flex items-start">
                  <span style={{ color: colors.primary }} className="mr-3">🏛️</span>
                  <span style={{ color: colors.text.secondary }}>Department of Computer Engineering</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <form style={{ backgroundColor: colors.cardBackground }} className="p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Leave Us a Message</h3>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2" style={{ color: colors.text.secondary }}>Your Name</label>
                <input type="text" id="name" className="w-full p-3 border rounded focus:outline-none" style={{ backgroundColor: colors.input.background, borderColor: colors.input.border, color: colors.text.primary }} />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2" style={{ color: colors.text.secondary }}>Email Address</label>
                <input type="email" id="email" className="w-full p-3 border rounded focus:outline-none" style={{ backgroundColor: colors.input.background, borderColor: colors.input.border, color: colors.text.primary }} />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2" style={{ color: colors.text.secondary }}>Message</label>
                <textarea id="message" rows="4" className="w-full p-3 border rounded focus:outline-none" style={{ backgroundColor: colors.input.background, borderColor: colors.input.border, color: colors.text.primary }}></textarea>
              </div>
              <button type="submit" style={{ backgroundColor: colors.button.primary, color: colors.button.text }} className="py-3 px-6 rounded hover:opacity-80 transition-colors w-full cursor-pointer">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;