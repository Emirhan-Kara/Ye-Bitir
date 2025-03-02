import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
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

  // Company values
  const values = [
    {
      title: "Authenticity",
      description: "Every recipe on YeBitir is carefully tested to ensure it delivers authentic flavors and techniques.",
      icon: "🍲"
    },
    {
      title: "Accessibility",
      description: "We believe great cooking should be accessible to everyone, regardless of skill level or background.",
      icon: "🌍"
    },
    {
      title: "Innovation",
      description: "While honoring traditional recipes, we embrace new technologies and approaches to create an exceptional user experience.",
      icon: "💡"
    },
    {
      title: "Education",
      description: "As a university project, we're committed to learning and applying software engineering principles in a real-world context.",
      icon: "🎓"
    }
  ];

  return (
    <div className="bg-gray-300 min-h-screen">
      {/* Hero section */}
      <div className="relative bg-red-800 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="grid grid-cols-6 gap-1 w-full h-full">
            {Array.from({ length: 24 }).map((_, index) => (
              <div key={index} className="bg-center bg-cover" style={{ backgroundImage: `url(/api/placeholder/200/200)` }}></div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About YeBitir</h1>
          <p className="text-xl max-w-3xl mx-auto text-center">
            Connecting food lovers with authentic, delicious recipes - A Software Engineering Project
          </p>
        </div>
      </div>
      
      {/* Our story section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-red-800 mb-6">Our Project</h2>
            <p className="text-gray-700 mb-4">
              YeBitir (meaning "Eat-it-Up" in Turkish) is a Software Engineering course project developed by 3rd year Computer Engineering students at Kadir Has University under the supervision of Prof. İlktan Ar.
            </p>
            <p className="text-gray-700 mb-4">
              Our platform aims to create a space where food enthusiasts can discover, share, and celebrate the joy of cooking authentic recipes from around the world.
            </p>
            <p className="text-gray-700">
              We believe that food is more than sustenance—it's a gateway to culture, memory, and connection. Our team is applying software engineering principles to build a robust, user-friendly platform that brings this vision to life while gaining valuable real-world development experience.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <img src="/api/placeholder/300/300" alt="Team planning session" className="rounded-lg shadow-md w-full" />
              <img src="/api/placeholder/300/300" alt="Development meeting" className="rounded-lg shadow-md w-full mt-8" />
              <img src="/api/placeholder/300/300" alt="Kadir Has University" className="rounded-lg shadow-md w-full" />
              <img src="/api/placeholder/300/300" alt="Software prototype" className="rounded-lg shadow-md w-full mt-8" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Our values section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-red-800 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow transition-transform hover:scale-105">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-red-800 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Team section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-red-800 mb-12 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-105">
              <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-800 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold text-red-800 mb-4 text-center">Project Supervision</h3>
          <p className="text-gray-700 text-center">This project is developed as part of the Software Engineering course under the supervision of Prof. İlktan Ar at Kadir Has University.</p>
        </div>
      </div>
      
      {/* Join us section */}
      <div className="bg-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Culinary Community</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Whether you're a seasoned chef or a curious beginner, there's a place for you at YeBitir. 
            Share recipes, connect with fellow food lovers, and embark on a delicious journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/add-recipe" className="border-2 border-white text-white hover:bg-red-700 font-bold py-3 px-26 rounded-lg">
              Share Recipes
            </Link>
            <Link to="/recipes" className="border-2 border-white text-white hover:bg-red-700 font-bold py-3 px-26 rounded-lg">
              Explore Recipes
            </Link>
          </div>
        </div>
      </div>
      
      {/* Contact section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-red-800 mb-8 text-center">Contact Us</h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold text-red-800 mb-4">Get In Touch</h3>
              <p className="text-gray-700 mb-6">
                Have questions, suggestions, or feedback about our project? We'd love to hear from you!
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-red-800 mr-3">📍</span>
                  <span className="text-gray-700">Kadir Has University, Cibali, Istanbul, Turkey</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-800 mr-3">📧</span>
                  <span className="text-gray-700">yebitir@khas.edu.tr</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-800 mr-3">🏛️</span>
                  <span className="text-gray-700">Department of Computer Engineering</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <form className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold text-red-800 mb-4">Leave Us a Message</h3>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input type="text" id="subject" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea id="message" rows="4" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
              </div>
              <button type="submit" className="bg-red-800 text-white py-3 px-6 rounded hover:bg-red-700 transition-colors w-full">
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