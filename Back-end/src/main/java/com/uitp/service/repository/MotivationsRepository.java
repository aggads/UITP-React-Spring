package com.uitp.service.repository;

import com.uitp.service.entities.Motivations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface MotivationsRepository extends JpaRepository<Motivations, Long> {

    @Transactional
    @Modifying
    //    @Query(value = "INSERT INTO clients (name) SELECT (:name) WHERE NOT EXISTS ( SELECT (name) FROM clients WHERE name = :name )", nativeQuery = true )
    //    int saveClientIfNotExist(@Param("name") String name);

    @Query(value = "SELECT id, motivation FROM Motivations WHERE motivation = :motivation", nativeQuery = true)
    Motivations findByName(@Param("motivation") String motivation);
}
