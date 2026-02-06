import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white text-blue-900 p-1.5 rounded-lg font-bold text-xl">PM</div>
              <span className="text-2xl font-bold text-white">PmanagerBd</span>
            </div>
            <p className="text-sm">
              Marketplace to buy, sell, or rent properties across Bangladesh. Simple, clean, and trusted.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Buy</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/?type=flat_buy" className="hover:text-white">Buy Flat</Link></li>
              <li><Link to="/?type=land_buy" className="hover:text-white">Buy Land</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Rent</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/?type=flat_rent" className="hover:text-white">Rent Flat</Link></li>
              <li><Link to="/?type=furnished_flat_rent" className="hover:text-white">Furnished Flat</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Sell & Needed</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/?type=flat_sell" className="hover:text-white">Sell Flat</Link></li>
              <li><Link to="/?type=land_sell" className="hover:text-white">Sell Land</Link></li>
              <li><Link to="/?type=need_flat" className="hover:text-white">Need Flat</Link></li>
              <li><Link to="/?type=need_land" className="hover:text-white">Need Land</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} PmanagerBd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/create-post" className="hover:text-white">Post Ad</Link>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
