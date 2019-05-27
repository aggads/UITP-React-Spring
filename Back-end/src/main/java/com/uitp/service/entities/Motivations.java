package com.uitp.service.entities;


import lombok.Data;

import javax.persistence.*;

@Data
@Table
@Entity
public class Motivations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="motivation")
    private String motivation;
}
