import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Parse query params
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setFilter(typeParam);
    } else {
      setFilter('all');
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' ? true : post.type === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Properties' },
    { id: 'flat_buy', label: 'Buy Flat' },
    { id: 'flat_sell', label: 'Sell Flat' },
    { id: 'flat_rent', label: 'Rent Flat' },
    { id: 'furnished_flat_rent', label: 'Furnished Flat' },
    { id: 'land_buy', label: 'Buy Land' },
    { id: 'land_sell', label: 'Sell Land' },
    { id: 'need_flat', label: 'Need Flat' },
    { id: 'need_land', label: 'Need Land' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-blue-900 to-indigo-800 text-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 shadow-xl mb-10">
        <div className="absolute inset-0 overflow-hidden">
           {/* Abstract Background Pattern */}
           <svg className="absolute left-0 top-0 h-full w-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L50 100 L100 0 Z" fill="white" />
           </svg>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Find Your Dream Property in Bangladesh
          </h1>
          <p className="text-base md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            The most trusted marketplace for buying, selling, and renting flats and land.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-2 flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center w-full bg-gray-50 rounded-md sm:bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 ml-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search by location, title..." 
                className="w-full p-3 bg-transparent text-gray-700 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap ${
                filter === cat.id 
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300 ring-offset-2' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
             <p className="mt-4 text-gray-500">Loading properties...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map(post => (
              <div key={post._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                {/* Image Section */}
                <div className="relative h-48 sm:h-56 w-full bg-gray-200 overflow-hidden">
                  {post.image ? (
                    <img 
                      src={`http://localhost:5000/${post.image}`} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                     <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm text-white ${
                       post.type.includes('sell') || post.type.includes('buy') ? 'bg-red-500' : 
                       post.type.includes('need') ? 'bg-amber-500' : 'bg-green-500'
                     }`}>
                       {post.type.replace(/_/g, ' ')}
                     </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-lg md:text-xl">
                      {/* Format Price */}
                      Tk. {new Intl.NumberFormat('en-BD').format(post.price)}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1" title={post.title}>
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center text-gray-500 mb-3 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">{post.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {post.description}
                  </p>
                  
                  <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                    <Link 
                      to={`/post/${post._id}`} 
                      className="text-blue-600 font-semibold hover:text-blue-800 text-sm flex items-center group-hover:underline"
                    >
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredPosts.length === 0 && (
            <div className="text-center bg-white p-10 rounded-lg shadow mt-8">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <h3 className="text-xl font-medium text-gray-900">No properties found</h3>
               <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Home;