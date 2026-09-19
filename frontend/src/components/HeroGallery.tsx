'use client';

import React, { useState, useEffect } from 'react';
import { Grid } from 'lucide-react';
import { ListingImage } from '@/types/listing';
import { PhotoTourModal } from '@/components/PhotoTourModal';
import { LightboxModal } from '@/components/LightboxModal';

interface HeroGalleryProps {
  images: ListingImage[];
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ images }) => {
  const [showPhotoTour, setShowPhotoTour] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Sync URL query param ?modal=PHOTO_TOUR_SCROLLABLE
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('modal') === 'PHOTO_TOUR_SCROLLABLE') {
        setShowPhotoTour(true);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const heroImage = images.find((i) => i.isHero) || images[0];
  const remainingImages = images.filter((i) => i !== heroImage).slice(0, 4);

  const handleOpenPhotoTour = () => {
    setShowPhotoTour(true);
    const newUrl = `${window.location.pathname}?modal=PHOTO_TOUR_SCROLLABLE`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleClosePhotoTour = () => {
    setShowPhotoTour(false);
    const newUrl = window.location.pathname;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleSelectPhoto = (idx: number) => {
    setLightboxIdx(idx);
  };

  return (
    <>
      {/* 5-Image Mosaic Grid */}
      <div className="relative rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-2 h-[320px] sm:h-[420px] md:h-[460px] group">
        {/* Left Side: Large Hero Image (~50% width = 2 cols) */}
        <div
          onClick={handleOpenPhotoTour}
          className="md:col-span-2 relative h-full overflow-hidden cursor-pointer bg-gray-100"
        >
          <img
            src={heroImage?.url}
            alt={heroImage?.caption || 'Listing Hero Image'}
            className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-[0.85] hover:!opacity-100 hover:scale-[1.02]"
          />
          <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded font-medium backdrop-blur-md">
            {heroImage?.category}
          </div>
        </div>

        {/* Right Side: 2x2 Grid of 4 Smaller Images */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
          {remainingImages.map((img, idx) => {
            const isTopRight = idx === 1;
            const isBottomRight = idx === 3;

            return (
              <div
                key={img.id || idx}
                onClick={handleOpenPhotoTour}
                className={`relative h-full overflow-hidden cursor-pointer bg-gray-100 ${
                  isTopRight ? 'rounded-tr-xl' : ''
                } ${isBottomRight ? 'rounded-br-xl' : ''}`}
              >
                <img
                  src={img.url}
                  alt={img.caption || `Listing Image ${idx + 2}`}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-[0.85] hover:!opacity-100 hover:scale-[1.02]"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-md">
                  {img.category}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom-right Overlay Button */}
        <button
          onClick={handleOpenPhotoTour}
          className="absolute bottom-5 right-5 bg-white/95 text-[#222222] border border-[#222222] text-xs sm:text-sm font-semibold py-1.5 px-3.5 rounded-md shadow-md hover:bg-white hover:shadow-lg flex items-center gap-2 transition-all cursor-pointer"
        >
          <Grid className="w-4 h-4 stroke-[2.5]" />
          <span>Show all photos</span>
        </button>
      </div>

      {/* 1. Photo Tour Full-Screen View (?modal=PHOTO_TOUR_SCROLLABLE) */}
      <PhotoTourModal
        images={images}
        isOpen={showPhotoTour}
        onClose={handleClosePhotoTour}
        onSelectPhoto={handleSelectPhoto}
      />

      {/* 2. Single-Photo Lightbox Viewer */}
      <LightboxModal
        images={images}
        currentIndex={lightboxIdx ?? 0}
        isOpen={lightboxIdx !== null}
        onClose={() => setLightboxIdx(null)}
        onSelectIndex={(idx) => setLightboxIdx(idx)}
      />
    </>
  );
};
