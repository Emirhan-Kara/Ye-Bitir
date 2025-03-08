import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import AnimatedFoodIcons from './AnimatedFoodIcons';
import ThemeToggle from './ThemeToggle';
import { User, Mail, Lock, KeyRound, UserPlus } from 'lucide-react';
import './SignUp.css';

// Reuse the AnimatedFoodIconsBackground from Home
const AnimatedFoodIconsBackground = React.memo(({ count }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      <AnimatedFoodIcons count={count} />
    </div>
  );
});

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Track mouse position for responsive shapes
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - left,
          y: event.clientY - top
        });
      }
    };
    
    // Update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Password strength validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    // You would typically handle sign up here
    console.log('Sign up attempted with:', { name, email, password });
    
    // For testing, simulate successful sign up
    alert('Sign up successful (test)');
  };

  // Calculate position for edgy shapes based on mouse position
  const getShapeStyle = (baseX, baseY, moveFactor) => {
    const moveX = (mousePosition.x / (windowSize.width || 1) - 0.5) * moveFactor;
    const moveY = (mousePosition.y / (windowSize.height || 1) - 0.5) * moveFactor;
    
    return {
      transform: `translate(${baseX + moveX}px, ${baseY + moveY}px)`
    };
  };
  
  // Generate edgy shapes
  const generateEdgyShapes = () => {
    // Define shapes with various properties for an interesting background
    const shapeConfigs = [
      // Top left triangle
      {
        style: {
          ...getShapeStyle(-50, -50, 20),
          width: '300px',
          height: '300px',
          background: `${theme.headerfooter.logoRed}10`,
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          top: '0',
          left: '0'
        }
      },
      // Top right triangle (symmetrical)
      {
        style: {
          ...getShapeStyle(50, -50, 20),
          width: '300px',
          height: '300px',
          background: `${theme.headerfooter.logoRed}10`,
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          top: '0',
          right: '0'
        }
      },
      // Center diamond
      {
        style: {
          ...getShapeStyle(0, 0, 15),
          width: '200px',
          height: '200px',
          background: `${theme.core.containerHoover}15`,
          clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
          top: '50%',
          left: '50%',
          marginTop: '-100px',
          marginLeft: '-100px'
        }
      },
      // Bottom left zigzag
      {
        style: {
          ...getShapeStyle(-80, 100, 30),
          width: '400px',
          height: '200px',
          background: `${theme.core.text}08`,
          clipPath: 'polygon(0 100%, 25% 0, 50% 100%, 75% 0, 100% 100%)',
          bottom: '0',
          left: '0'
        }
      },
      // Bottom right zigzag (symmetrical)
      {
        style: {
          ...getShapeStyle(80, 100, 30),
          width: '400px',
          height: '200px',
          background: `${theme.core.text}08`,
          clipPath: 'polygon(0 100%, 25% 0, 50% 100%, 75% 0, 100% 100%)',
          bottom: '0',
          right: '0'
        }
      }
    ];
    
    return shapeConfigs.map((config, index) => (
      <div 
        key={`shape-${index}`}
        className={`edgy-shape shape-${index} absolute transition-transform duration-300 ease-out`}
        style={config.style}
      ></div>
    ));
  };

  return (
    <div 
      ref={containerRef}
      className="signup-container"
      style={{ 
        backgroundColor: theme.core.background, 
        color: theme.core.text 
      }}
    >
      {/* AnimatedFoodIconsBackground */}
      <AnimatedFoodIconsBackground count={80} />
      
      {/* Edgy shapes that respond to mouse movement */}
      <div className="shape-container">
        {generateEdgyShapes()}
      </div>

      {/* Theme Toggle */}
      <div className="theme-toggle-position">
        <ThemeToggle />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo/Brand */}
          <div className="flex justify-center animate-float">
            <Link to="/" className="flex flex-col items-center">
              <span className="font-bold text-5xl text-gray-900 drop-shadow-xl" style={{ 
                fontFamily: "cursive",
                color: theme.headerfooter.logoRed
              }}>
                Ye
              </span>
              <span className="font-bold text-5xl drop-shadow-xl" style={{ 
                fontFamily: "cursive",
                color: theme.core.text
              }}>
                Bitir
              </span>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-xl font-extrabold relative z-10 animate-fadeIn">
            <span className="relative edgy-title">Create account</span>
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fadeIn delay-200">
          <div 
            className="signup-card sm:rounded-lg sm:px-10 edgy-form-container" 
            style={{ 
              backgroundColor: `${theme.core.containerHoover}80`
            }}
          >
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-shake">
                <p>{error}</p>
              </div>
            )}
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <div className="mt-1 input-with-icon">
                  <div className="input-icon">
                    <User size={18} style={{ color: theme.core.text }} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="custom-input edgy-input"
                    style={{
                      backgroundColor: `${theme.headerfooter.searchBox}90`,
                      color: theme.core.text
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <div className="mt-1 input-with-icon">
                  <div className="input-icon">
                    <Mail size={18} style={{ color: theme.core.text }} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="custom-input edgy-input"
                    style={{
                      backgroundColor: `${theme.headerfooter.searchBox}90`,
                      color: theme.core.text
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="mt-1 input-with-icon">
                  <div className="input-icon">
                    <Lock size={18} style={{ color: theme.core.text }} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input edgy-input"
                    style={{
                      backgroundColor: `${theme.headerfooter.searchBox}90`,
                      color: theme.core.text
                    }}
                  />
                </div>
                <p className="mt-1 text-xs opacity-80">
                  Password must be at least 8 characters
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <div className="mt-1 input-with-icon">
                  <div className="input-icon">
                    <KeyRound size={18} style={{ color: theme.core.text }} />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="custom-input edgy-input"
                    style={{
                      backgroundColor: `${theme.headerfooter.searchBox}90`,
                      color: theme.core.text
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="signup-btn edgy-button"
                  style={{ 
                    backgroundColor: theme.headerfooter.logoRed
                  }}
                >
                  <UserPlus size={18} />
                  <span>Sign up</span>
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2" style={{ 
                    backgroundColor: theme.core.containerHoover,
                    color: theme.core.text
                  }}>Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => console.log('Google sign-up clicked')}
                  className="google-btn edgy-input"
                  style={{ 
                    backgroundColor: `${theme.headerfooter.searchBox}90`,
                    color: theme.core.text
                  }}
                >
                  {/* Google logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-medium hover:underline transition-colors" style={{ color: theme.headerfooter.logoRed }}>
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center animate-fadeIn delay-300">
          <Link to="/" className="text-sm hover:underline transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;