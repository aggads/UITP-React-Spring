package com.uitp.service.entities;


import lombok.Data;

import javax.persistence.*;

@Data
@Table
@Entity

public class Modes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String name;

}
