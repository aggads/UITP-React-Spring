package com.uitp.service.entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "questions")
@Entity
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="question")
    private String question;


    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "incident")
    private Incident incident;
}
