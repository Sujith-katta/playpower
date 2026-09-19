package com.playpower.airbnb_clone.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "listings")
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String location;
    private Double rating;
    private Integer reviewCount;
    private Integer maxGuests;
    private Integer bedrooms;
    private Integer beds;
    private Integer baths;
    private Double basePrice;
    private Double cleaningFee;
    private Double serviceFee;

    @Column(length = 4000)
    private String description;

    private String hostName;
    private String hostAvatar;
    private Boolean isSuperhost;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "listing_id")
    private List<ListingImage> images = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "listing_id")
    private List<Amenity> amenities = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "listing_id")
    private List<Review> reviews = new ArrayList<>();

    public Listing() {
    }

    public Listing(Long id, String title, String location, Double rating, Integer reviewCount,
                   Integer maxGuests, Integer bedrooms, Integer beds, Integer baths,
                   Double basePrice, Double cleaningFee, Double serviceFee, String description,
                   String hostName, String hostAvatar, Boolean isSuperhost) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.maxGuests = maxGuests;
        this.bedrooms = bedrooms;
        this.beds = beds;
        this.baths = baths;
        this.basePrice = basePrice;
        this.cleaningFee = cleaningFee;
        this.serviceFee = serviceFee;
        this.description = description;
        this.hostName = hostName;
        this.hostAvatar = hostAvatar;
        this.isSuperhost = isSuperhost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Integer getMaxGuests() {
        return maxGuests;
    }

    public void setMaxGuests(Integer maxGuests) {
        this.maxGuests = maxGuests;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBeds() {
        return beds;
    }

    public void setBeds(Integer beds) {
        this.beds = beds;
    }

    public Integer getBaths() {
        return baths;
    }

    public void setBaths(Integer baths) {
        this.baths = baths;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getHostAvatar() {
        return hostAvatar;
    }

    public void setHostAvatar(String hostAvatar) {
        this.hostAvatar = hostAvatar;
    }

    public Boolean getIsSuperhost() {
        return isSuperhost;
    }

    public void setIsSuperhost(Boolean isSuperhost) {
        this.isSuperhost = isSuperhost;
    }

    public List<ListingImage> getImages() {
        return images;
    }

    public void setImages(List<ListingImage> images) {
        this.images = images;
    }

    public List<Amenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<Amenity> amenities) {
        this.amenities = amenities;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
