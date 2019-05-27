package com.uitp.service.repository;

import com.uitp.service.entities.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface QuestionsRepository extends JpaRepository<Questions, Long> {

    @Transactional
    @Modifying
    //    @Query(value = "INSERT INTO clients (name) SELECT (:name) WHERE NOT EXISTS ( SELECT (name) FROM clients WHERE name = :name )", nativeQuery = true )
    //    int saveClientIfNotExist(@Param("name") String name);

    @Query(value = "SELECT id, id_incident, question FROM Questions WHERE question = :question", nativeQuery = true)
    Questions findByName(@Param("question") String question);


    @Query(value = "SELECT q FROM Questions q WHERE q.incident.id= :incident")
    List<Questions> findByIdIncident(@Param("incident") int idIncident);
}
