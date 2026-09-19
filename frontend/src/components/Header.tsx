'use client';

import React from 'react';
import { Search, Globe, Menu, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DDDDDD] transition-all">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 cursor-pointer group">
          <svg
            className="w-9 h-9 text-[#FF385C] transition-transform duration-200 group-hover:scale-105"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.308-3.232 7.806-7.5 7.806-2.903 0-5.467-1.606-6.756-3.992l-.244-.482-.244.482C13.467 30.394 10.903 32 8 32 3.732 32 .5 28.502.5 24.194c0-.994.225-1.928.877-3.483l.239-.533c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C10.537 1.963 11.992 1 14 1h2zm0 2h-2c-1.233 0-2.257.575-3.29 2.426l-.417.803c-1.892 3.708-5.992 12.302-6.947 14.536l-.2.447C2.656 23.36 2.5 23.953 2.5 24.194 2.5 27.382 5.006 30 8 30c2.258 0 4.316-1.343 5.405-3.444l.595-1.15.595 1.15C15.684 28.657 17.742 30 20 30c2.994 0 5.5-2.618 5.5-5.806 0-.649-.168-1.341-.65-2.486l-.196-.437c-.955-2.234-5.055-10.828-6.947-14.536l-.417-.803C16.257 3.575 15.233 3 14 3z" />
          </svg>
          <span className="text-xl font-bold text-[#FF385C] tracking-tight hidden md:inline">
            airbnb
          </span>
        </a>

        {/* Search Capsule Bar */}
        <div className="flex items-center border border-[#DDDDDD] rounded-full py-2.5 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-sm font-semibold text-[#222222]">
          <span className="px-3 border-r border-[#DDDDDD]">Anywhere</span>
          <span className="px-3 border-r border-[#DDDDDD]">Any week</span>
          <span className="px-3 text-[#717171] font-normal">Add guests</span>
          <div className="bg-[#FF385C] text-white p-2 rounded-full ml-1 flex items-center justify-center shadow-sm">
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center gap-2">
          <button className="hidden md:block text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] py-2.5 px-4 rounded-full transition-colors">
            Airbnb your home
          </button>
          <button className="p-3 hover:bg-[#F7F7F7] text-[#222222] rounded-full transition-colors">
            <Globe className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 border border-[#DDDDDD] rounded-full py-1.5 px-3 hover:shadow-md transition-all cursor-pointer">
            <Menu className="w-4 h-4 text-[#222222]" />
            <div className="w-7 h-7 bg-[#717171] text-white rounded-full flex items-center justify-center overflow-hidden">
              <User className="w-4 h-4 fill-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
