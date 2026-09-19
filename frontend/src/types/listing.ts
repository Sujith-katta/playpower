export interface ListingImage {
  id: number;
  url: string;
  caption: string;
  category: string;
  features?: string;
  isHero: boolean;
}

export interface Amenity {
  id: number;
  name: string;
  category: string;
  iconName: string;
}

export interface Review {
  id: number;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Listing {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  description: string;
  hostName: string;
  hostAvatar: string;
  isSuperhost: boolean;
  images: ListingImage[];
  amenities: Amenity[];
  reviews: Review[];
}

export interface ReservationRequest {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
}

export interface ReservationResponse {
  listingId: number;
  checkIn: string;
  checkOut: string;
  numberOfNights: number;
  basePrice: number;
  totalBasePrice: number;
  cleaningFee: number;
  serviceFee: number;
  totalPrice: number;
}
