package com.uitp.service.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Table(name = "result")
@Entity
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="id_user")
    private int idUser;

    @Column(name="id_frequency")
    private int idFrequency;

    @Column(name="id_motivation")
    private int idMotivation;

    @Column(name="id_question")
    private int idQuestion;

    @OneToMany(mappedBy = "result")
    @JsonIgnore
    private Set<Result> result;
}
