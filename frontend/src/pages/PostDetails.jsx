import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!post) return (
    <div className="text-center mt-20 text-gray-600">
      <h2 className="text-2xl font-bold">Post not found</h2>
      <Link to="/" className="text-blue-500 hover:underline mt-4 block">Return to Home</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Image Header */}
        <div className="relative h-64 sm:h-96 w-full bg-gray-200">
           {post.image ? (
             <img src={`http://localhost:5000/${post.image}`} alt={post.title} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
             </div>
           )}
           <Link to="/" className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow hover:bg-white transition text-gray-800">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
           </Link>
           <div className="absolute top-4 right-4">
              <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg text-white ${
                post.type.includes('sell') || post.type.includes('buy') ? 'bg-red-600' : 
                post.type.includes('need') ? 'bg-amber-600' : 'bg-green-600'
              }`}>
                {post.type.replace(/_/g, ' ')}
              </span>
           </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-6">
             <div>
               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
               <div className="flex items-center text-gray-500">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                 </svg>
                 <span className="text-lg">{post.location}</span>
               </div>
             </div>
             <div className="mt-4 md:mt-0 text-left md:text-right">
               <p className="text-sm text-gray-500 uppercase font-semibold">Price</p>
               <p className="text-3xl font-bold text-blue-600">
                 Tk. {new Intl.NumberFormat('en-BD').format(post.price)}
               </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Description</h3>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.description}</p>
              </div>
            </div>

            <div className="space-y-6">
               <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                 <h3 className="text-lg font-bold text-blue-900 mb-4 border-b border-blue-200 pb-2">Contact Information</h3>
                 <div className="space-y-3">
                   <div className="flex items-start">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                     </svg>
                     <p className="font-medium text-gray-800 break-all">{post.contact}</p>
                   </div>
                   <div className="flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                     <p className="text-gray-600">Posted by <span className="font-semibold text-gray-800">{post.user?.name || 'Unknown'}</span></p>
                   </div>
                   <div className="flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                     <p className="text-gray-600 text-sm">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
                   </div>
                 </div>
               </div>
               
               <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-sm text-amber-800">
                 <strong>Safety Tip:</strong> Always meet in a safe, public place and inspect the property before making any payments.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;