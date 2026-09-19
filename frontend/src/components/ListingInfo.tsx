'use client';

import React, { useState } from 'react';
import { Laptop, Key, Calendar, Award, ChevronRight, X } from 'lucide-react';
import { Listing } from '@/types/listing';

interface ListingInfoProps {
  listing: Listing;
}

export const ListingInfo: React.FC<ListingInfoProps> = ({ listing }) => {
  const [showDescModal, setShowDescModal] = useState(false);

  return (
    <div className="space-y-6 py-6 border-b border-[#DDDDDD]">
      {/* Host Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#DDDDDD]">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#222222]">
            Entire rental unit hosted by Mirashya
          </h2>
          <p className="text-sm text-[#222222] font-normal mt-1">
            {listing.maxGuests} guests · {listing.bedrooms} bedroom · {listing.beds} bed · {listing.baths} bath
          </p>
        </div>
        <div className="relative shrink-0">
          <img
            src={listing.hostAvatar}
            alt={listing.hostName}
            className="w-14 h-14 rounded-full object-cover border border-[#DDDDDD] shadow-sm"
          />
          {listing.isSuperhost && (
            <div className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full shadow">
              <Award className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      {/* Highlights Block */}
      <div className="space-y-6 py-2 border-b border-[#DDDDDD]">
        <div className="flex items-start gap-4">
          <Laptop className="w-6 h-6 text-[#222222] mt-0.5 shrink-0 stroke-[1.5]" />
          <div>
            <h3 className="font-semibold text-[#222222] text-base">Dedicated workspace</h3>
            <p className="text-sm text-[#717171] mt-0.5">A room with wifi that's well-suited for working.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Key className="w-6 h-6 text-[#222222] mt-0.5 shrink-0 stroke-[1.5]" />
          <div>
            <h3 className="font-semibold text-[#222222] text-base">Self check-in with lockbox</h3>
            <p className="text-sm text-[#717171] mt-0.5">Check yourself in with the smart lock keyless entry.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Calendar className="w-6 h-6 text-[#222222] mt-0.5 shrink-0 stroke-[1.5]" />
          <div>
            <h3 className="font-semibold text-[#222222] text-base">Free cancellation for 48 hours</h3>
            <p className="text-sm text-[#717171] mt-0.5">Get a full refund if you change your mind.</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="pt-4 space-y-3">
        <p className="text-[#222222] text-base leading-relaxed line-clamp-4">
          {listing.description}
        </p>

        <button
          onClick={() => setShowDescModal(true)}
          className="flex items-center gap-1 font-semibold text-[#222222] underline hover:text-black transition-colors text-base pt-2"
        >
          <span>Show more</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Description Full Modal */}
      {showDescModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <div className="sticky top-0 bg-white border-b border-[#DDDDDD] pb-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-[#222222]">About this space</h3>
              <button
                onClick={() => setShowDescModal(false)}
                className="p-2 hover:bg-[#F7F7F7] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#222222]" />
              </button>
            </div>

            <div className="pt-6 text-[#222222] text-base leading-relaxed whitespace-pre-line space-y-4">
              <p>{listing.description}</p>
              <p>
                The space comes fully furnished with modern decor, a king-size memory foam mattress, 
                high-speed 100 Mbps fiber WiFi connection, and a private balcony overlooking the serene pool area.
              </p>
              <h4 className="font-bold text-lg pt-2">Guest access</h4>
              <p>
                Guests have exclusive private access to the entire suite, private heated jacuzzi, balcony, 
                as well as shared access to the main resort swimming pool and secure parking area.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
