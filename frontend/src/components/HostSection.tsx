'use client';

import React from 'react';
import { Award, ShieldCheck, MessageSquare } from 'lucide-react';
import { Listing } from '@/types/listing';

interface HostSectionProps {
  listing: Listing;
}

export const HostSection: React.FC<HostSectionProps> = ({ listing }) => {
  return (
    <div className="py-8 border-b border-gray-200 space-y-6">
      <div className="flex items-center gap-4">
        <img
          src={listing.hostAvatar}
          alt={listing.hostName}
          className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">Hosted by {listing.hostName}</h3>
          <p className="text-xs text-gray-500">Joined in January 2022 · Superhost</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-gray-700 font-medium">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#FF385C]" />
          <span>43 Reviews</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gray-800" />
          <span>Identity verified</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-800" />
          <span>Response rate: 100%</span>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
        At Mirashya Stays, we craft luxurious, unforgettable holiday experiences in North Goa. 
        Our dedicated hospitality team is available 24/7 to assist you with local recommendations, 
        airport transfers, and personalized arrangements.
      </p>

      <button className="border border-gray-900 text-gray-900 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-50 transition text-sm">
        Contact Host
      </button>
    </div>
  );
};
