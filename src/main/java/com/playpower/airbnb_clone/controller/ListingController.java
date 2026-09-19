package com.playpower.airbnb_clone.controller;

import com.playpower.airbnb_clone.dto.ReservationRequest;
import com.playpower.airbnb_clone.dto.ReservationResponse;
import com.playpower.airbnb_clone.entity.Listing;
import com.playpower.airbnb_clone.repository.ListingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.temporal.ChronoUnit;

@RestController
@RequestMapping("/api/listings")
public class ListingController {


    private final ListingRepository listingRepository;

    public ListingController(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable Long id) {
        return listingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/reserve")
    public ResponseEntity<ReservationResponse> calculateReservation(
            @PathVariable Long id,
            @RequestBody ReservationRequest request) {

        return listingRepository.findById(id).map(listing -> {
            long nights = 1;
            if (request.getCheckIn() != null && request.getCheckOut() != null) {
                nights = ChronoUnit.DAYS.between(request.getCheckIn(), request.getCheckOut());
                if (nights <= 0) {
                    nights = 1;
                }
            }

            double basePrice = listing.getBasePrice();
            double totalBasePrice = basePrice * nights;
            double cleaningFee = listing.getCleaningFee();
            double serviceFee = listing.getServiceFee();
            double totalPrice = totalBasePrice + cleaningFee + serviceFee;

            ReservationResponse response = new ReservationResponse(
                    listing.getId(),
                    request.getCheckIn(),
                    request.getCheckOut(),
                    nights,
                    basePrice,
                    totalBasePrice,
                    cleaningFee,
                    serviceFee,
                    totalPrice
            );

            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }
}
