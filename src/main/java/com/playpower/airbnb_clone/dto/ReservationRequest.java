package com.playpower.airbnb_clone.dto;

import java.time.LocalDate;

public class ReservationRequest {

    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;

    public ReservationRequest() {
    }

    public ReservationRequest(LocalDate checkIn, LocalDate checkOut, Integer guests) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.guests = guests;
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

    public Integer getGuests() {
        return guests;
    }

    public void setGuests(Integer guests) {
        this.guests = guests;
    }
}
