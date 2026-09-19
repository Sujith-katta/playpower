import { Listing, ReservationRequest, ReservationResponse } from '@/types/listing';
import { FALLBACK_LISTING } from '@/data/listingFallback';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchListing(id: number | string = 1): Promise<Listing> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${API_BASE_URL}/listings/${id}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Backend API returned status ${res.status}. Using fallback dataset.`);
      return FALLBACK_LISTING;
    }

    const data: Listing = await res.json();
    return data;
  } catch (error) {
    console.warn('Backend API connection failed/offline. Falling back to local dataset.', error);
    return FALLBACK_LISTING;
  }
}

export async function reserveListing(
  id: number | string,
  req: ReservationRequest
): Promise<ReservationResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${API_BASE_URL}/listings/${id}/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn('Backend reservation calculation failed. Computing locally.', error);

    // Calculate locally as fallback
    let nights = 1;
    if (req.checkIn && req.checkOut) {
      const start = new Date(req.checkIn);
      const end = new Date(req.checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (isNaN(nights) || nights <= 0) nights = 1;
    }

    const basePrice = FALLBACK_LISTING.basePrice;
    const totalBasePrice = basePrice * nights;
    const cleaningFee = FALLBACK_LISTING.cleaningFee;
    const serviceFee = FALLBACK_LISTING.serviceFee;
    const totalPrice = totalBasePrice + cleaningFee + serviceFee;

    return {
      listingId: Number(id),
      checkIn: req.checkIn,
      checkOut: req.checkOut,
      numberOfNights: nights,
      basePrice,
      totalBasePrice,
      cleaningFee,
      serviceFee,
      totalPrice,
    };
  }
}
