'use client';

import React from 'react';
import { Bed } from 'lucide-react';

export const SleepingSection: React.FC = () => {
  return (
    <div className="py-8 border-b border-[#DDDDDD] space-y-4">
      <h3 className="text-xl font-semibold text-[#222222]">Where you'll sleep</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-[#DDDDDD] rounded-xl p-6 space-y-3 hover:shadow-md transition-shadow cursor-pointer bg-white">
          <div className="w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#222222]">
            <Bed className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-[#222222] text-base">Bedroom 1</h4>
            <p className="text-sm text-[#717171] mt-0.5">1 plush king bed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
