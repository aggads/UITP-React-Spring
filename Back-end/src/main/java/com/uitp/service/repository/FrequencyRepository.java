package com.uitp.service.repository;

import com.uitp.service.entities.Frequency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FrequencyRepository extends JpaRepository<Frequency, Long> {

//    @Transactional
//    @Modifying
//    @Query(value = "INSERT INTO clients (name) SELECT (:name) WHERE NOT EXISTS ( SELECT (name) FROM clients WHERE name = :name )", nativeQuery = true )
//    int saveClientIfNotExist(@Param("name") String name);

    @Query(value = "SELECT id, regularity FROM Frequency WHERE regularity = :regularity", nativeQuery = true)
    Frequency findByName(@Param("regularity") String regularity);
}
