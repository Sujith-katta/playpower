'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { TitleHeader } from '@/components/TitleHeader';
import { HeroGallery } from '@/components/HeroGallery';
import { ListingInfo } from '@/components/ListingInfo';
import { SleepingSection } from '@/components/SleepingSection';
import { AmenitiesGrid } from '@/components/AmenitiesGrid';
import { CalendarSection } from '@/components/CalendarSection';
import { ReservationCard } from '@/components/ReservationCard';
import { ReviewsSection } from '@/components/ReviewsSection';
import { LocationSection } from '@/components/LocationSection';
import { HostSection } from '@/components/HostSection';
import { Footer } from '@/components/Footer';
import { Listing } from '@/types/listing';
import { fetchListing } from '@/lib/api';
import { FALLBACK_LISTING } from '@/data/listingFallback';
import { Database, WifiOff } from 'lucide-react';

export default function Home() {
  const [listing, setListing] = useState<Listing>(FALLBACK_LISTING);
  const [isBackendOnline, setIsBackendOnline] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkIn, setCheckIn] = useState<string>('2026-10-01');
  const [checkOut, setCheckOut] = useState<string>('2026-10-06');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchListing(1);
        setListing(data);

        // Check backend status via /api/listings/1 proxy endpoint
        const res = await fetch('/api/listings/1').catch(() => null);
        setIsBackendOnline(!!res && res.ok);
      } catch (err) {
        console.warn('Backend API offline, serving fallback dataset', err);
        setIsBackendOnline(false);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleDateChange = (newCheckIn: string, newCheckOut: string) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#222222] antialiased selection:bg-[#FF385C] selection:text-white">
      {/* Connectivity Ribbon */}
      <div
        className={`text-xs py-1.5 px-4 text-center font-semibold flex items-center justify-center gap-2 ${
          isBackendOnline
            ? 'bg-emerald-600 text-white'
            : 'bg-amber-500 text-white'
        }`}
      >
        {isBackendOnline ? (
          <>
            <Database className="w-3.5 h-3.5" />
            <span>Connected to Spring Boot API (http://localhost:8080/api/listings/1)</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3.5 h-3.5" />
            <span>Backend Offline · Serving from pre-seeded Local JSON Fallback</span>
          </>
        )}
      </div>

      <Header />

      <main className="max-w-[1280px] mx-auto px-6 sm:px-10">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-[#717171]">Loading listing details...</p>
          </div>
        ) : (
          <>
            <TitleHeader listing={listing} />

            <HeroGallery images={listing.images} />

            {/* Two-Column Desktop Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
              {/* Left Column (~65% width = 7 cols) */}
              <div className="lg:col-span-7 space-y-2">
                <ListingInfo listing={listing} />
                <SleepingSection />
                <AmenitiesGrid amenities={listing.amenities} />
                <CalendarSection
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onDateChange={handleDateChange}
                />
                <ReviewsSection listing={listing} />
                <LocationSection location={listing.location} />
                <HostSection listing={listing} />
              </div>

              {/* Right Column (~35% width = 5 cols sticky) */}
              <div className="lg:col-span-5 relative">
                <ReservationCard
                  listing={listing}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onDateChange={handleDateChange}
                />
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
