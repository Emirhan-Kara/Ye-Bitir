import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#cfd8dc] w-full py-6 px-4">
      <div className="w-19/20 container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Logo and Description */}
        <div className="flex flex-col">
          <div className="flex items-center mb-3">
            <h2 className="text-3xl font-bold">
              <span className="text-gray-700" style={{ textShadow: '1px 1px 0 #000' }}>Ye</span>
              <span className="text-red-800">Bitir</span>
            </h2>
          </div>
          <p className="text-sm text-gray-700">
            Ye-Bitir is a user-friendly recipe app offering diverse
            cuisines, step-by-step cooking guides, meal planning,
            and personalized recommendations.
          </p>
        </div>
        
        {/* Middle Column - Quick Contact */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-center">Quick Contact</h3>
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center w-full">
              <div className="bg-gray-200 p-2 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <Mail size={18} className="text-gray-700" />
              </div>
              <span className="text-sm">yebitir@gmail.com</span>
            </div>
            <div className="flex items-center w-full">
              <div className="bg-gray-200 p-2 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <Phone size={18} className="text-gray-700" />
              </div>
              <span className="text-sm">+90 500 000 00 00</span>
            </div>
          </div>
        </div>
        
        {/* Right Column - Copyright and Legal Links */}
        <div className="flex flex-col text-sm text-gray-700">
          <div className="mb-2">
            © 2025 Ye-Bitir. Created by Zaid, Emirhan, Hayrunnisa,
            and Rumeysa.
            All rights reserved.
          </div>
          <div className="flex flex-wrap">
            {/*<a href="/advertise" className="hover:underline mr-1">Advertise</a> |
            <a href="/adchoices" className="hover:underline mx-1">AdChoices</a> |
            <a href="/privacy" className="hover:underline mx-1">Privacy Policy</a> |
            <a href="/visitor-agreement" className="hover:underline mx-1">Visitor Agreement</a> |
            <a href="/kvkk" className="hover:underline mx-1">KVKK Compliance</a> |
            <a href="/do-not-share" className="hover:underline mx-1">Do Not Share My Personal Data</a>*/}
            <a href="/privacy" className="hover:underline mx-1">Privacy Policy</a> |
            <a href="/about-us" className="hover:underline mx-1">About Us</a> |
            <a href="/kvkk" className="hover:underline mx-1">KVKK Compliance</a> |
            <a href="/privacy" className="hover:underline mx-1">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;