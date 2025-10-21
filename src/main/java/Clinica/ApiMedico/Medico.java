/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clinica.ApiMedico;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 *
 * @author kevin
 */
@Entity
public class Medico {
    @Id
    private String cod;
    private String nom;
    private String ape;
    private String spe;

    public Medico() {
    }

    public Medico(String cod, String nom, String ape, String spe) {
        this.cod = cod;
        this.nom = nom;
        this.ape = ape;
        this.spe = spe;
    }

    public String getCod() {
        return cod;
    }

    public void setCod(String cod) {
        this.cod = cod;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getApe() {
        return ape;
    }

    public void setApe(String ape) {
        this.ape = ape;
    }

    public String getSpe() {
        return spe;
    }

    public void setSpe(String spe) {
        this.spe = spe;
    }
    
    
}
