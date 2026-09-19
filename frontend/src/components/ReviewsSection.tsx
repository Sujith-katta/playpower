'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Listing } from '@/types/listing';

interface ReviewsSectionProps {
  listing: Listing;
}

const CATEGORY_SCORES = [
  { name: 'Cleanliness', score: 4.9 },
  { name: 'Accuracy', score: 4.9 },
  { name: 'Communication', score: 5.0 },
  { name: 'Location', score: 4.8 },
  { name: 'Check-in', score: 5.0 },
  { name: 'Value', score: 4.9 },
];

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ listing }) => {
  return (
    <div id="reviews" className="py-8 border-b border-[#DDDDDD] space-y-8">
      {/* Title & Overall Rating */}
      <div className="flex items-center gap-2 text-2xl font-semibold text-[#222222]">
        <Star className="w-6 h-6 fill-[#222222] text-[#222222]" />
        <span>{listing.rating.toFixed(2)}</span>
        <span className="text-[#717171]">·</span>
        <span>{listing.reviewCount} reviews</span>
      </div>

      {/* Category Ratings Bar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
        {CATEGORY_SCORES.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between text-sm">
            <span className="text-[#222222] font-normal">{cat.name}</span>
            <div className="flex items-center gap-3 w-1/2">
              <div className="flex-1 bg-[#DDDDDD] h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[#222222] h-full rounded-full"
                  style={{ width: `${(cat.score / 5) * 100}%` }}
                />
              </div>
              <span className="font-semibold text-xs text-[#222222]">{cat.score.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Guest Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {listing.reviews.map((rev) => (
          <div key={rev.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={rev.authorAvatar}
                alt={rev.authorName}
                className="w-12 h-12 rounded-full object-cover shadow-sm border border-[#DDDDDD]"
              />
              <div>
                <h4 className="font-semibold text-[#222222] text-base">{rev.authorName}</h4>
                <div className="text-xs text-[#717171]">{rev.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs pt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(rev.rating)
                      ? 'fill-[#222222] text-[#222222]'
                      : 'text-[#DDDDDD]'
                  }`}
                />
              ))}
            </div>

            <p className="text-[#222222] text-sm leading-relaxed">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
