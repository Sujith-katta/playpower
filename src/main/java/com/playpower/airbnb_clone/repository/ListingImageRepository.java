package com.playpower.airbnb_clone.repository;

import com.playpower.airbnb_clone.entity.ListingImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingImageRepository extends JpaRepository<ListingImage, Long> {
}
