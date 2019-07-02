package com.uitp.service.repository;

import com.uitp.service.entities.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ResultRepository extends JpaRepository<Result, Long> {

//    @Transactional
//    @Modifying
//    @Query(value = "INSERT INTO result (name) SELECT (:name) WHERE NOT EXISTS ", nativeQuery = true )
//    int saveResultIfNotExist(@Param("result") int result);

    @Transactional
    @Modifying
    @Query(value ="insert into result (id_user, id_frequency, id_motivation, id_question) values(:id_user, :id_frequency, :id_motivation, :id_question)", nativeQuery = true)
    public void storeData(@Param("id_user") int idUser, @Param("id_frequency") int idFrequency, @Param("id_motivation") int idMotivation, @Param("id_question") int idQuestion );

}

// SELECT  result.id_user, users.name, frequency.regularity, motivations.motivation FROM result INNER JOIN users ON users.id = result.id_user INNER JOIN frequency ON frequency.id = result.id_frequency INNER JOIN motivations ON motivations.id = result.id_motivation