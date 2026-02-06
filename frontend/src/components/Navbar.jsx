import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthBase';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const handleMouseEnter = (menu) => setActiveDropdown(menu);
  const handleMouseLeave = () => setActiveDropdown(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleMobileDropdown = (title) => {
    if (activeMobileDropdown === title) {
      setActiveMobileDropdown(null);
    } else {
      setActiveMobileDropdown(title);
    }
  };

  const navLinks = [
    {
      title: 'Buy',
      items: [
        { name: 'Buy Flat', link: '/?type=flat_buy' },
        { name: 'Buy Land', link: '/?type=land_buy' },
      ]
    },
    {
      title: 'Rent',
      items: [
        { name: 'Rent Flat', link: '/?type=flat_rent' },
        { name: 'Furnished Flat', link: '/?type=furnished_flat_rent' },
      ]
    },
    {
      title: 'Sell',
      items: [
        { name: 'Sell Flat', link: '/?type=flat_sell' },
        { name: 'Sell Land', link: '/?type=land_sell' },
      ]
    },
    {
      title: 'Needed',
      items: [
        { name: 'Need Flat', link: '/?type=need_flat' },
        { name: 'Need Land', link: '/?type=need_land' },
      ]
    }
  ];

  return (
    <nav className="bg-linear-to-r from-blue-900 to-indigo-800 text-white shadow-lg z-50 relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
             <div className="bg-white text-blue-900 p-1.5 rounded-lg font-bold text-xl">PM</div>
             <span className="text-2xl font-bold tracking-tight">PmanagerBd</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-white/10 transition font-medium">Home</Link>
            
            {navLinks.map((menu) => (
              <div 
                key={menu.title}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(menu.title)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-3 py-2 rounded-md hover:bg-white/10 transition font-medium flex items-center">
                  {menu.title}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown */}
                <div className={`absolute left-0 mt-0 w-48 bg-white rounded-md shadow-xl py-2 transition-all duration-200 origin-top-left transform ${
                   activeDropdown === menu.title ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}>
                  {menu.items.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.link} 
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link to="/create-post" className="ml-4 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-bold transition shadow-md flex items-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
               Post Ad
            </Link>
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-white/10 py-1 px-3 rounded-full border border-white/20">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                   {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-sm truncate max-w-25">{user.name}</span>
                <button onClick={logout} className="text-red-300 hover:text-red-100 transition" title="Logout">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 rounded-md hover:bg-white/10 transition font-medium">Login</Link>
                <Link to="/register" className="bg-white text-blue-900 px-4 py-2 rounded-md font-bold hover:bg-gray-100 transition shadow-sm">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button onClick={toggleMobileMenu} className="text-white p-2 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 {mobileMenuOpen ? (
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 ) : (
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                 )}
               </svg>
             </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
           <div className="md:hidden pb-4 pt-2 border-t border-white/10 animate-fade-in-down">
              <Link to="/" className="block py-2 px-4 hover:bg-white/10 rounded-md mb-1">Home</Link>
              
              {navLinks.map((menu) => (
                <div key={menu.title} className="mb-1">
                  <button 
                    onClick={() => toggleMobileDropdown(menu.title)}
                    className="w-full flex justify-between items-center py-2 px-4 hover:bg-white/10 rounded-md focus:outline-none"
                  >
                    <span>{menu.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${activeMobileDropdown === menu.title ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeMobileDropdown === menu.title && (
                    <div className="bg-black/20 rounded-md mx-2 overflow-hidden">
                      {menu.items.map((item) => (
                        <Link 
                          key={item.name} 
                          to={item.link} 
                          className="block py-2 px-8 text-sm hover:bg-white/10 text-gray-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="border-t border-white/10 my-2 pt-2">
                 {user ? (
                   <div className="px-4 space-y-3">
                      <div className="flex items-center space-x-3 py-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                           {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold">{user.name}</span>
                      </div>
                      <Link to="/create-post" className="block bg-amber-500 text-center py-2 rounded-md font-bold" onClick={() => setMobileMenuOpen(false)}>
                        Post Ad
                      </Link>
                      <button onClick={logout} className="block w-full text-left py-2 text-red-300 hover:text-white">
                        Logout
                      </button>
                   </div>
                 ) : (
                   <div className="px-4 space-y-2">
                     <Link to="/login" className="block text-center py-2 hover:bg-white/10 rounded-md border border-white/30" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                     <Link to="/register" className="block text-center py-2 bg-white text-blue-900 rounded-md font-bold" onClick={() => setMobileMenuOpen(false)}>Register</Link>
                   </div>
                 )}
              </div>
           </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;