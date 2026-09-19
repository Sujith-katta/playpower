'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarSectionProps {
  checkIn: string;
  checkOut: string;
  onDateChange: (checkIn: string, checkOut: string) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  checkIn,
  checkOut,
  onDateChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(9); // October 2026

  const daysInOctober = 31;
  const daysInNovember = 30;

  return (
    <div className="py-8 border-b border-[#DDDDDD] space-y-4">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-[#222222]">
          Select check-in date
        </h3>
        <p className="text-sm text-[#717171]">
          Add your travel dates for exact pricing and availability
        </p>
      </div>

      {/* Interactive Calendar Month Container */}
      <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between font-semibold text-[#222222] text-sm">
          <button className="p-2 hover:bg-white rounded-full transition-colors border border-[#DDDDDD]">
            <ChevronLeft className="w-4 h-4 text-[#222222]" />
          </button>
          <div className="flex gap-12 text-base">
            <span>October 2026</span>
            <span className="hidden sm:inline">November 2026</span>
          </div>
          <button className="p-2 hover:bg-white rounded-full transition-colors border border-[#DDDDDD]">
            <ChevronRight className="w-4 h-4 text-[#222222]" />
          </button>
        </div>

        {/* October Month Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#717171]">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          
          {/* Padding empty days */}
          <div /><div /><div /><div />
          
          {[...Array(daysInOctober)].map((_, i) => {
            const dayNum = i + 1;
            const dateStr = `2026-10-${dayNum < 10 ? '0' + dayNum : dayNum}`;
            const isSelected = dateStr >= checkIn && dateStr <= checkOut;

            return (
              <button
                key={dayNum}
                onClick={() => {
                  if (!checkIn || (checkIn && checkOut)) {
                    onDateChange(dateStr, '');
                  } else {
                    if (dateStr > checkIn) {
                      onDateChange(checkIn, dateStr);
                    } else {
                      onDateChange(dateStr, '');
                    }
                  }
                }}
                className={`h-9 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                  isSelected
                    ? 'bg-[#222222] text-white font-bold'
                    : 'hover:border hover:border-[#222222] text-[#222222]'
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs font-semibold text-[#717171]">Minimum stay: 2 nights</span>
          <button
            onClick={() => onDateChange('2026-10-01', '2026-10-05')}
            className="text-xs font-semibold text-[#222222] underline hover:text-black"
          >
            Clear dates
          </button>
        </div>
      </div>
    </div>
  );
};
