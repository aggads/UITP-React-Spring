package com.uitp.service.repository;

import com.uitp.service.entities.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {




}

// SELECT  result.id_user, users.name, frequency.regularity, motivations.motivation FROM result INNER JOIN users ON users.id = result.id_user INNER JOIN frequency ON frequency.id = result.id_frequency INNER JOIN motivations ON motivations.id = result.id_motivation