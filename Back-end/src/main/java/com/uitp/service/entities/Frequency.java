package com.uitp.service.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Table
@Entity
public class Frequency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="regularity")
    private int regularity;

//    @JsonManagedReference
//    @OneToMany(mappedBy = "client")
//    private Set<Plates> plates;

}
