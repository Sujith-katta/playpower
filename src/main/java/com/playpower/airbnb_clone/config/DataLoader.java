package com.playpower.airbnb_clone.config;

import com.playpower.airbnb_clone.entity.Amenity;
import com.playpower.airbnb_clone.entity.Listing;
import com.playpower.airbnb_clone.entity.ListingImage;
import com.playpower.airbnb_clone.entity.Review;
import com.playpower.airbnb_clone.repository.ListingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ListingRepository listingRepository;

    public DataLoader(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (listingRepository.count() == 0) {
            Listing listing = new Listing(
                    null,
                    "Romantic Jacuzzi 18HK Candolim  Mirashya UG10",
                    "Candolim, Goa, India",
                    4.91,
                    43,
                    2,
                    1,
                    1,
                    1,
                    3500.0,
                    500.0,
                    350.0,
                    "Experience romantic luxury in Candolim, Goa! Our ultra-modern suite 'Mirashya UG10' features a private heated Jacuzzi, serene poolside view, plush king bed, and elegant interior design. Located just minutes away from Candolim Beach, fine dining restaurants, and lively night spots. Ideal for couples seeking a tranquil getaway with premium amenities.",
                    "Mirashya Stays",
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
                    true
            );

            // Seed Images
            List<ListingImage> images = List.of(
                    new ListingImage("https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80", "Private Heated Jacuzzi", "Jacuzzi", true),
                    new ListingImage("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80", "Modern Living Area", "Living room", false),
                    new ListingImage("https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80", "Plush King Bedroom", "Bedroom", false),
                    new ListingImage("https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80", "Luxury Ensuite Bathroom", "Bathroom", false),
                    new ListingImage("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", "Poolside View & Balcony", "Outdoor", false)
            );
            listing.setImages(images);

            // Seed Amenities
            List<Amenity> amenities = List.of(
                    new Amenity("Private Jacuzzi", "Bathroom", "Bath"),
                    new Amenity("Pool view", "Scenic views", "Waves"),
                    new Amenity("Fast Wi-Fi (100 Mbps)", "Internet", "Wifi"),
                    new Amenity("Air conditioning", "Climate control", "Wind"),
                    new Amenity("Dedicated workspace", "Office", "Laptop"),
                    new Amenity("Free parking on premises", "Parking", "Car"),
                    new Amenity("Fully equipped Kitchen", "Kitchen", "Utensils"),
                    new Amenity("55\" HDTV with Netflix", "Entertainment", "Tv"),
                    new Amenity("Washer & Dryer", "Laundry", "Shirt"),
                    new Amenity("Private balcony", "Outdoor", "Sun")
            );
            listing.setAmenities(amenities);

            // Seed Reviews
            List<Review> reviews = List.of(
                    new Review("Aarav Sharma", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", 5.0, "August 2026", "The jacuzzi was absolute bliss! Spotless room, super fast WiFi, and amazing hospitality by Mirashya Stays."),
                    new Review("Priya Patel", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", 4.9, "July 2026", "Perfect romantic stay in Candolim. Very close to the beach and top cafes. Highly recommend!"),
                    new Review("Rohan Gupta", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", 5.0, "June 2026", "Amazing location and top notch amenities. The private balcony and pool view made our evenings so peaceful.")
            );
            listing.setReviews(reviews);

            listingRepository.save(listing);
            System.out.println(">>> Sample data seeded successfully into H2 Database!");
        }
    }
}
