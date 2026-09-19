'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ListingImage } from '@/types/listing';

interface LightboxModalProps {
  images: ListingImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const currentImage = images[currentIndex] || images[0];

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-5 text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white flex items-center gap-2"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Close</span>
          </button>

          {/* Photo Counter */}
          <div className="text-sm font-medium tracking-wide text-gray-300">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image Category */}
          <div className="text-xs uppercase tracking-widest text-gray-400 font-mono hidden sm:block bg-white/10 px-3 py-1 rounded">
            {currentImage.category}
          </div>
        </div>

        {/* Center Main Lightbox Canvas */}
        <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 overflow-hidden">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all transform active:scale-95 cursor-pointer backdrop-blur-md"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Animated Image Display */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="max-w-5xl max-h-[78vh] flex items-center justify-center p-2"
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption || `Photo ${currentIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all transform active:scale-95 cursor-pointer backdrop-blur-md"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Bottom Caption Bar */}
        <div className="py-4 px-6 text-center text-gray-300 text-sm font-medium z-20 bg-gradient-to-t from-black/80 to-transparent">
          <span>{currentImage.caption}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
