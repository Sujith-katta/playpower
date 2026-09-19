'use client';

import React from 'react';
import { MapPin, Compass } from 'lucide-react';

interface LocationSectionProps {
  location: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ location }) => {
  return (
    <div className="py-8 border-b border-gray-200 space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Where you'll be</h3>
      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
        <MapPin className="w-4 h-4 text-[#FF385C]" />
        <span>{location}</span>
      </div>

      {/* Map visual card */}
      <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-gray-200 shadow-md group">
        <img
          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"
          alt="Goa Beach Map View"
          className="w-full h-full object-cover filter contrast-[0.95] brightness-95 transition transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Pin Highlight */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 bg-[#FF385C]/30 rounded-full animate-ping" />
            <div className="bg-[#FF385C] text-white p-3 rounded-full shadow-2xl z-10 flex items-center justify-center">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/40 shadow-lg text-xs font-semibold text-gray-900">
          Candolim Beach (800m) · Fort Aguada (3.2km)
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed pt-2">
        Candolim is one of the most serene and sought-after coastal neighborhoods in North Goa. 
        Enjoy walkable access to pristine sandy beaches, vibrant beach shacks, authentic Goan seafood eateries, 
        and high-end boutique shopping.
      </p>
    </div>
  );
};
