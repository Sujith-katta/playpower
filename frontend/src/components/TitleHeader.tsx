'use client';

import React, { useState } from 'react';
import { Star, Share, Heart, Award } from 'lucide-react';
import { Listing } from '@/types/listing';

interface TitleHeaderProps {
  listing: Listing;
}

export const TitleHeader: React.FC<TitleHeaderProps> = ({ listing }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="pt-6 pb-4">
      {/* Title */}
      <h1 className="text-2xl sm:text-[26px] font-semibold text-[#222222] tracking-tight leading-snug">
        {listing.title}
      </h1>

      {/* Details & Action Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-2 text-sm font-semibold text-[#222222]">
        <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
          <div className="flex items-center gap-1 font-semibold text-[#222222]">
            <Star className="w-4 h-4 fill-[#222222] text-[#222222]" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>
          <span className="text-[#717171]">·</span>
          <a
            href="#reviews"
            className="underline text-[#222222] hover:text-black transition"
          >
            {listing.reviewCount} reviews
          </a>
          {listing.isSuperhost && (
            <>
              <span className="text-[#717171]">·</span>
              <div className="flex items-center gap-1 text-[#222222]">
                <Award className="w-4 h-4 text-[#FF385C]" />
                <span>Superhost</span>
              </div>
            </>
          )}
          <span className="text-[#717171]">·</span>
          <a
            href="#location"
            className="underline text-[#222222] hover:text-black transition font-semibold"
          >
            {listing.location}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 hover:bg-[#F7F7F7] py-2 px-3 rounded-lg transition-colors text-[#222222] underline font-semibold text-xs sm:text-sm">
            <Share className="w-4 h-4 stroke-[2]" />
            <span>Share</span>
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center gap-2 hover:bg-[#F7F7F7] py-2 px-3 rounded-lg transition-colors text-[#222222] underline font-semibold text-xs sm:text-sm"
          >
            <Heart
              className={`w-4 h-4 stroke-[2] ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-[#222222]'
              }`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
