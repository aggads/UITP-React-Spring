package com.uitp.service.repository;

import com.uitp.service.entities.Modes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModesRepository extends JpaRepository<Modes, Long> {

//    @Transactional
//    @Modifying
//    //    @Query(value = "INSERT INTO clients (name) SELECT (:name) WHERE NOT EXISTS ( SELECT (name) FROM clients WHERE name = :name )", nativeQuery = true )
//    //    int saveClientIfNotExist(@Param("name") String name);
//
//    @Query(value = "SELECT id, name FROM Modes WHERE name = :name", nativeQuery = true)
//    Incident findByName(@Param("name") String name);
}
