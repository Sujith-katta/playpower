package com.playpower.airbnb_clone.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "listing_images")
public class ListingImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String url;

    private String caption;
    private String category;
    private boolean isHero;

    public ListingImage() {
    }

    public ListingImage(String url, String caption, String category, boolean isHero) {
        this.url = url;
        this.caption = caption;
        this.category = category;
        this.isHero = isHero;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean getIsHero() {
        return isHero;
    }

    public void setIsHero(boolean hero) {
        isHero = hero;
    }
}
