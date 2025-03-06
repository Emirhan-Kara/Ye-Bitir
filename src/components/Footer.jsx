import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer 
      className="w-full py-6 px-4"
      style={{ 
        backgroundColor: theme.headerfooter.background,
        color: theme.headerfooter.text 
      }}
    >
      <div className="w-19/20 container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Logo and Description */}
        <div className="flex flex-col">
          <div className="flex items-center mb-3">
            <h2 className="text-3xl font-bold">
              <span 
                className="text-xl" 
                style={{ color: theme.headerfooter.text }}
              >
                Ye
              </span>
              <span 
                className="text-xl" 
                style={{ color: theme.headerfooter.logoRed }}
              >
                Bitir
              </span>
            </h2>
          </div>
          <p 
            className="text-sm"
            style={{ color: theme.headerfooter.text }}
          >
            Ye-Bitir is a user-friendly recipe app offering diverse
            cuisines, step-by-step cooking guides, meal planning,
            and personalized recommendations.
          </p>
        </div>
        
        {/* Middle Column - Quick Contact */}
        <div className="flex flex-col">
          <h3 
            className="text-xl font-semibold mb-4 text-center"
            style={{ color: theme.headerfooter.text }}
          >
            Quick Contact
          </h3>
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center w-full">
              <div 
                className="p-2 rounded-full w-10 h-10 flex items-center justify-center mr-3"
                style={{ 
                  backgroundColor: theme.headerfooter.componentBg,
                }}
              >
                <Mail 
                  size={18} 
                  color={theme.headerfooter.text} 
                />
              </div>
              <span 
                className="text-sm"
                style={{ color: theme.headerfooter.text }}
              >
                yebitir@gmail.com
              </span>
            </div>
            <div className="flex items-center w-full">
              <div 
                className="p-2 rounded-full w-10 h-10 flex items-center justify-center mr-3"
                style={{ 
                  backgroundColor: theme.headerfooter.componentBg,
                }}
              >
                <Phone 
                  size={18} 
                  color={theme.headerfooter.text} 
                />
              </div>
              <span 
                className="text-sm"
                style={{ color: theme.headerfooter.text }}
              >
                +90 500 000 00 00
              </span>
            </div>
          </div>
        </div>
        
        {/* Right Column - Copyright and Legal Links */}
        <div className="flex flex-col text-sm">
          <div 
            className="mb-2"
            style={{ color: theme.headerfooter.text }}
          >
            © 2025 Ye-Bitir. Created by Zaid, Emirhan, Hayrunnisa,
            and Rumeysa.
            All rights reserved.
          </div>
          <div className="flex flex-wrap">
            {[
              { href: "/privacy", text: "Privacy Policy" },
              { href: "/about-us", text: "About Us" },
              { href: "/kvkk", text: "KVKK Compliance" },
              { href: "/privacy", text: "Privacy Policy" }
            ].map((link, index) => (
              <React.Fragment key={link.href}>
                <a 
                  href={link.href} 
                  className="hover:underline mx-1"
                  style={{ 
                    color: theme.headerfooter.logoRed,
                  }}
                >
                  {link.text}
                </a>
                {index < 3 && ' | '}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;