'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, Share, Heart, X } from 'lucide-react';
import { ListingImage } from '@/types/listing';

interface PhotoTourModalProps {
  images: ListingImage[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (index: number) => void;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  images,
  isOpen,
  onClose,
  onSelectPhoto,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);
  const categoriesRef = useRef<Record<string, HTMLDivElement | null>>({});

  // Group images by category section
  const categories = Array.from(
    new Set(images.map((img) => img.category || 'Overview'))
  );

  useEffect(() => {
    if (!isOpen) return;

    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, categories, activeCategory]);

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = categoriesRef.current[category];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto min-h-screen select-none font-sans text-[#222222]">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#DDDDDD] px-6 sm:px-10 h-16 flex items-center justify-between shadow-xs">
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#F7F7F7] rounded-full transition-colors flex items-center gap-2 text-[#222222] font-semibold text-sm cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Header Title */}
        <h1 className="text-base sm:text-lg font-bold text-[#222222]">
          Photo tour
        </h1>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 hover:bg-[#F7F7F7] py-2 px-3 rounded-lg transition-colors text-[#222222] underline font-semibold text-xs sm:text-sm cursor-pointer">
            <Share className="w-4 h-4 stroke-[2]" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center gap-2 hover:bg-[#F7F7F7] py-2 px-3 rounded-lg transition-colors text-[#222222] underline font-semibold text-xs sm:text-sm cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 stroke-[2] ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-[#222222]'
              }`}
            />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-[#222222] stroke-[2.5]" />
          </button>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 py-8 space-y-16">
        {/* Top Thumbnail Navigation Grid (Matching Airbnb screenshot) */}
        <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar border-b border-[#DDDDDD]">
          {categories.map((cat) => {
            const firstImg = images.find((i) => (i.category || 'Overview') === cat);

            return (
              <div
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className="flex flex-col gap-2 cursor-pointer group shrink-0 w-28 sm:w-32"
              >
                <div className="w-28 h-20 sm:w-32 sm:h-24 rounded-2xl overflow-hidden border border-gray-200 shadow-xs group-hover:shadow-md transition-all">
                  <img
                    src={firstImg?.url}
                    alt={cat}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors ${
                    activeCategory === cat ? 'text-[#FF385C]' : 'text-[#222222] group-hover:text-black'
                  }`}
                >
                  {cat}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Content Sections (Matching screenshot 2-column layout) */}
        <div className="space-y-20 pb-28">
          {categories.map((category) => {
            const categoryImages = images.filter(
              (img) => (img.category || 'Overview') === category
            );

            return (
              <div
                key={category}
                ref={(el) => {
                  categoriesRef.current[category] = el;
                }}
                className="scroll-mt-24 space-y-12 border-b border-[#DDDDDD] pb-16"
              >
                {categoryImages.map((img, idx) => {
                  const globalIdx = images.indexOf(img);

                  return (
                    <div
                      key={img.id || idx}
                      className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
                    >
                      {/* Left Column: Room Name & Subtext */}
                      <div className="md:col-span-5 space-y-2 pt-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-tight">
                          {category}
                        </h2>
                        {img.features && (
                          <p className="text-sm sm:text-base text-[#717171] font-normal leading-relaxed">
                            {img.features}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 font-medium pt-1">
                          {img.caption}
                        </p>
                      </div>

                      {/* Right Column: High-Res Photo Card */}
                      <div
                        onClick={() => onSelectPhoto(globalIdx)}
                        className="md:col-span-7 group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all"
                      >
                        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                          <img
                            src={img.url}
                            alt={img.caption || category}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
