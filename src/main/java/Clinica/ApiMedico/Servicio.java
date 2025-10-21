/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clinica.ApiMedico;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author kevin
 */
@Service
public class Servicio {

    @Autowired
    private Repositorio repo;

    public Medico grabar(Medico med) {
        return repo.save(med);
    }

    public Medico buscar(String cod) {
        return repo.findById(cod).orElse(null);
    }

    public List<Medico> listar() {
        return repo.findAll();
    }

    public Medico actualizar(String cod, Medico med) {
        return repo.findById(cod).map(existing -> {
            existing.setNom(med.getNom());
            existing.setApe(med.getApe());
            existing.setSpe(med.getSpe());
            return repo.save(existing);
        }).orElse(null);
    }

    public void eliminar(String cod) {
        repo.deleteById(cod);
    }
}
