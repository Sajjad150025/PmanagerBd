import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthBase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.7)] border border-blue-100">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-600 mb-6">Log In</h2>
        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded" role="alert">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200" 
              placeholder="Enter your email"
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200" 
              placeholder="Enter your password"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-linear-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-800 transform hover:-translate-y-0.5 transition duration-200 shadow-lg"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-600 font-bold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
