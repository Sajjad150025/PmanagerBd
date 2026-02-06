import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthBase';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'flat_rent',
    price: '',
    location: '',
    contact: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (image) data.append('image', image);

      await axios.post('http://localhost:5000/api/posts', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">Please login to create a post.</p>
        <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Go to Login</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 py-6 px-6 sm:px-8">
           <h2 className="text-2xl sm:text-3xl font-bold text-white">Create a New Ad</h2>
           <p className="text-blue-100 mt-2">Fill in the details to list your property</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="col-span-2">
               <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Title</label>
               <input 
                 name="title" 
                 onChange={handleChange} 
                 placeholder="e.g. Luxury 3 Bedroom Apartment" 
                 className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
                 required 
               />
             </div>

             <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
               <div className="relative">
                 <select name="type" onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value="flat_rent">Flat Rent</option>
                    <option value="furnished_flat_rent">Furnished Flat Rent</option>
                    <option value="flat_buy">Flat Buy</option>
                    <option value="flat_sell">Flat Sell</option>
                    <option value="land_buy">Land Buy</option>
                    <option value="land_sell">Land Sell</option>
                    <option value="need_flat">Need Flat</option>
                    <option value="need_land">Need Land</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                 </div>
               </div>
             </div>

             <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Tk)</label>
               <input 
                 name="price" 
                 type="number" 
                 onChange={handleChange} 
                 placeholder="e.g. 25000" 
                 className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                 required 
               />
             </div>

             <div className="col-span-2">
               <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
               <textarea 
                 name="description" 
                 onChange={handleChange} 
                 rows="4" 
                 placeholder="Describe your property (size, facilities, nearby amenities...)" 
                 className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                 required 
               />
             </div>

             <div className="col-span-2">
               <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
               <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <input 
                    name="location" 
                    onChange={handleChange} 
                    placeholder="e.g. Dhanmondi, Dhaka" 
                    className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    required 
                  />
               </div>
             </div>

             <div className="col-span-2">
               <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Information</label>
               <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <input 
                    name="contact" 
                    onChange={handleChange} 
                    placeholder="e.g. 01712....." 
                    className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    required 
                  />
               </div>
             </div>

             <div className="col-span-2">
               <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photo</label>
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  {imagePreview ? (
                    <div className="relative">
                       <img src={imagePreview} alt="Preview" className="mx-auto h-48 object-cover rounded-lg" />
                       <p className="mt-2 text-sm text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                       <p className="text-sm text-gray-600 font-medium">Click to upload an image</p>
                       <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
               </div>
             </div>
          </div>

          <div className="pt-4">
             <button 
               type="submit" 
               disabled={loading}
               className={`w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
             >
               {loading ? 'Posting...' : 'Post Ad Now'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
