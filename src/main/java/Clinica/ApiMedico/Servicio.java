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

    public Medico buscar(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Medico> listar() {
        return repo.findAll();
    }

    public Medico actualizar(Long id, Medico med) {
        return repo.findById(id).map(existing -> {
            existing.setNom(med.getNom());
            existing.setIdEsp(med.getIdEsp());
            return repo.save(existing);
        }).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
