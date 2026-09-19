package com.playpower.airbnb_clone.dto;

import java.time.LocalDate;

public class ReservationResponse {

    private Long listingId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private long numberOfNights;
    private Double basePrice;
    private Double totalBasePrice;
    private Double cleaningFee;
    private Double serviceFee;
    private Double totalPrice;

    public ReservationResponse() {
    }

    public ReservationResponse(Long listingId, LocalDate checkIn, LocalDate checkOut,
                               long numberOfNights, Double basePrice, Double totalBasePrice,
                               Double cleaningFee, Double serviceFee, Double totalPrice) {
        this.listingId = listingId;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.numberOfNights = numberOfNights;
        this.basePrice = basePrice;
        this.totalBasePrice = totalBasePrice;
        this.cleaningFee = cleaningFee;
        this.serviceFee = serviceFee;
        this.totalPrice = totalPrice;
    }

    public Long getListingId() {
        return listingId;
    }

    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public long getNumberOfNights() {
        return numberOfNights;
    }

    public void setNumberOfNights(long numberOfNights) {
        this.numberOfNights = numberOfNights;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public Double getTotalBasePrice() {
        return totalBasePrice;
    }

    public void setTotalBasePrice(Double totalBasePrice) {
        this.totalBasePrice = totalBasePrice;
    }

    public Double getCleaningFee() {
        return cleaningFee;
    }

    public void setCleaningFee(Double cleaningFee) {
        this.cleaningFee = cleaningFee;
    }

    public Double getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(Double serviceFee) {
        this.serviceFee = serviceFee;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
