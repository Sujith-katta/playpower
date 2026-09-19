'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Listing, ReservationResponse } from '@/types/listing';
import { reserveListing } from '@/lib/api';

interface ReservationCardProps {
  listing: Listing;
  checkIn: string;
  checkOut: string;
  onDateChange: (checkIn: string, checkOut: string) => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  listing,
  checkIn,
  checkOut,
  onDateChange,
}) => {
  const [guests, setGuests] = useState<number>(2);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [calculation, setCalculation] = useState<ReservationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isReserved, setIsReserved] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function updatePrice() {
      setLoading(true);
      const res = await reserveListing(listing.id, { checkIn, checkOut, guests });
      if (isMounted) {
        setCalculation(res);
        setLoading(false);
      }
    }

    updatePrice();
    return () => {
      isMounted = false;
    };
  }, [listing.id, checkIn, checkOut, guests]);

  const handleReserve = () => {
    setIsReserved(true);
    setTimeout(() => setIsReserved(false), 5000);
  };

  const nights = calculation?.numberOfNights || 5;
  const totalBasePrice = calculation?.totalBasePrice || listing.basePrice * nights;
  const cleaningFee = calculation?.cleaningFee || listing.cleaningFee;
  const serviceFee = calculation?.serviceFee || listing.serviceFee;
  const totalPrice = calculation?.totalPrice || totalBasePrice + cleaningFee + serviceFee;

  return (
    <div className="sticky top-28 bg-white border border-[#DDDDDD] rounded-2xl p-6 shadow-xl space-y-6">
      {/* Price Header */}
      <div className="flex justify-between items-baseline">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-[#222222]">
            ₹{listing.basePrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[#717171] text-base font-normal">/ night</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-[#222222]">
          <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
          <span>{listing.rating.toFixed(2)}</span>
          <span className="text-[#717171]">·</span>
          <a href="#reviews" className="text-[#717171] underline hover:text-black">
            {listing.reviewCount} reviews
          </a>
        </div>
      </div>

      {/* Date & Guest Picker Widget */}
      <div className="border border-[#717171] rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-2 border-b border-[#717171]">
          <div className="p-3 border-r border-[#717171] hover:bg-[#F7F7F7] transition-colors cursor-pointer">
            <label className="block text-[10px] font-extrabold uppercase text-[#222222] tracking-wider">
              CHECK-IN
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => onDateChange(e.target.value, checkOut)}
              className="w-full text-xs font-semibold text-[#222222] bg-transparent outline-none cursor-pointer"
            />
          </div>
          <div className="p-3 hover:bg-[#F7F7F7] transition-colors cursor-pointer">
            <label className="block text-[10px] font-extrabold uppercase text-[#222222] tracking-wider">
              CHECKOUT
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => onDateChange(checkIn, e.target.value)}
              className="w-full text-xs font-semibold text-[#222222] bg-transparent outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Guest Selector Dropdown */}
        <div className="relative p-3 hover:bg-[#F7F7F7] transition-colors cursor-pointer">
          <label className="block text-[10px] font-extrabold uppercase text-[#222222] tracking-wider">
            GUESTS
          </label>
          <div
            onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            className="flex justify-between items-center text-xs font-semibold text-[#222222] pt-0.5"
          >
            <span>
              {guests} guest{guests > 1 ? 's' : ''}
            </span>
            <ChevronDown className="w-4 h-4 text-[#222222]" />
          </div>

          {showGuestDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#DDDDDD] rounded-xl shadow-xl p-4 z-20 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <div className="font-semibold text-[#222222]">Adults</div>
                  <div className="text-xs text-[#717171]">Age 13+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={guests <= 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      setGuests((g) => Math.max(1, g - 1));
                    }}
                    className="w-8 h-8 rounded-full border border-[#717171] flex items-center justify-center text-[#222222] hover:border-[#222222] disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm w-4 text-center">{guests}</span>
                  <button
                    disabled={guests >= listing.maxGuests}
                    onClick={(e) => {
                      e.stopPropagation();
                      setGuests((g) => Math.min(listing.maxGuests, g + 1));
                    }}
                    className="w-8 h-8 rounded-full border border-[#717171] flex items-center justify-center text-[#222222] hover:border-[#222222] disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-[#717171]">
                This property has a maximum capacity of {listing.maxGuests} guests.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reserve Button with exact Airbnb red gradient */}
      <button
        onClick={handleReserve}
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#FF385C] via-[#E61E49] to-[#E31C5F] hover:opacity-95 text-white font-semibold py-3.5 rounded-xl shadow-md transition transform active:scale-95 text-center text-base cursor-pointer"
      >
        {isReserved ? (
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>Reservation Confirmed!</span>
          </div>
        ) : (
          'Reserve'
        )}
      </button>

      <p className="text-center text-xs text-[#717171]">You won't be charged yet</p>

      {/* Price Breakdown Table */}
      <div className="space-y-3 pt-4 border-t border-[#DDDDDD] text-base text-[#222222]">
        <div className="flex justify-between items-center">
          <span className="underline text-[#222222]">
            ₹{listing.basePrice.toLocaleString('en-IN')} x {nights} night{nights > 1 ? 's' : ''}
          </span>
          <span>₹{totalBasePrice.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="underline text-[#222222]">Cleaning fee</span>
          <span>₹{cleaningFee.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="underline text-[#222222]">Service fee</span>
          <span>₹{serviceFee.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[#DDDDDD] text-lg font-bold text-[#222222]">
          <span>Total before taxes</span>
          <span>₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};
