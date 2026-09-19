'use client';

import React, { useState } from 'react';
import {
  Bath,
  Waves,
  Wifi,
  Wind,
  Laptop,
  Car,
  Utensils,
  Tv,
  Shirt,
  Sun,
  X,
  Sparkles,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { Amenity } from '@/types/listing';

interface AmenitiesGridProps {
  amenities: Amenity[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Bath: <Bath className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Waves: <Waves className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Wifi: <Wifi className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Wind: <Wind className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Laptop: <Laptop className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Car: <Car className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Utensils: <Utensils className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Tv: <Tv className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Shirt: <Shirt className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Sun: <Sun className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
  Elevator: <Building2 className="w-6 h-6 text-[#222222] stroke-[1.5]" />,
};

export const AmenitiesGrid: React.FC<AmenitiesGridProps> = ({ amenities }) => {
  const [showModal, setShowModal] = useState(false);

  // Core 8 amenities requested specifically in prompt
  const displayAmenities = [
    { id: 1, name: 'Private Jacuzzi', iconName: 'Bath' },
    { id: 2, name: 'Wifi (100 Mbps)', iconName: 'Wifi' },
    { id: 3, name: 'Air conditioning', iconName: 'Wind' },
    { id: 4, name: 'Kitchen', iconName: 'Utensils' },
    { id: 5, name: 'Dedicated workspace', iconName: 'Laptop' },
    { id: 6, name: 'Free parking on premises', iconName: 'Car' },
    { id: 7, name: 'TV with Netflix', iconName: 'Tv' },
    { id: 8, name: 'Elevator access', iconName: 'Elevator' },
  ];

  return (
    <div className="py-8 border-b border-[#DDDDDD]">
      <h3 className="text-xl font-semibold text-[#222222] mb-6">
        What this place offers
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayAmenities.map((item) => (
          <div key={item.id} className="flex items-center gap-4 text-[#222222] text-base font-normal">
            {ICON_MAP[item.iconName] || <Sparkles className="w-6 h-6 text-[#222222]" />}
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-8 border border-[#222222] text-[#222222] font-semibold py-3 px-6 rounded-lg hover:bg-[#F7F7F7] transition-all text-sm"
      >
        Show all 50 amenities
      </button>

      {/* Amenities Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <div className="sticky top-0 bg-white border-b border-[#DDDDDD] pb-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-[#222222]">
                What this place offers
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#F7F7F7] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#222222]" />
              </button>
            </div>

            <div className="space-y-6 pt-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-[#222222] text-base border-b border-[#DDDDDD] pb-2">
                  Bathroom & Spa
                </h4>
                <div className="space-y-4">
                  {amenities.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-2 border-b border-gray-100 text-sm text-[#222222]"
                    >
                      {ICON_MAP[item.iconName] || <Sparkles className="w-6 h-6 text-[#222222]" />}
                      <div>
                        <div className="font-medium text-[#222222]">{item.name}</div>
                        <div className="text-xs text-[#717171]">{item.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
