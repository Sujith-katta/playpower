'use client';

import React, { useState } from 'react';
import { Grid, X } from 'lucide-react';
import { ListingImage } from '@/types/listing';

interface GalleryGridProps {
  images: ListingImage[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [showAllModal, setShowAllModal] = useState(false);

  // Fallback images if list is short
  const heroImage = images.find((i) => i.isHero) || images[0];
  const gridImages = images.filter((i) => i !== heroImage).slice(0, 4);

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-2 h-[350px] sm:h-[450px]">
        {/* Main Hero Photo (Left 2 cols) */}
        <div className="md:col-span-2 relative h-full group overflow-hidden cursor-pointer">
          <img
            src={heroImage?.url}
            alt={heroImage?.caption || 'Hero photo'}
            className="w-full h-full object-cover transition transform duration-300 group-hover:scale-105"
            onClick={() => setShowAllModal(true)}
          />
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm">
            {heroImage?.category || 'Hero Photo'}
          </div>
        </div>

        {/* Right 4 Grid Photos */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
          {gridImages.map((img, idx) => (
            <div
              key={img.id || idx}
              className="relative h-full group overflow-hidden cursor-pointer"
              onClick={() => setShowAllModal(true)}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm opacity-90">
                {img.category}
              </div>
            </div>
          ))}
        </div>

        {/* Show all photos button */}
        <button
          onClick={() => setShowAllModal(true)}
          className="absolute bottom-5 right-5 bg-white text-gray-900 border border-gray-900 text-sm font-semibold py-1.5 px-4 rounded-lg shadow-md hover:bg-gray-50 flex items-center gap-2 transition"
        >
          <Grid className="w-4 h-4" />
          <span>Show all photos</span>
        </button>
      </div>

      {/* Full Photo Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto p-4 sm:p-8">
          <div className="sticky top-0 right-0 flex justify-between items-center py-4 bg-black/80 backdrop-blur-md px-4 rounded-xl mb-6 z-10 border border-white/10">
            <h2 className="text-white text-lg font-semibold">Photo Gallery</h2>
            <button
              onClick={() => setShowAllModal(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {images.map((img, index) => (
              <div key={index} className="space-y-2">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full rounded-xl object-cover max-h-[70vh] shadow-2xl"
                />
                <div className="flex justify-between text-gray-400 text-sm px-1">
                  <span>{img.caption}</span>
                  <span className="font-mono text-xs uppercase bg-white/10 px-2 py-0.5 rounded">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
