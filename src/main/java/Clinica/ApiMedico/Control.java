/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clinica.ApiMedico;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kevin
 */
@RestController
@RequestMapping("/medico")
public class Control {

    @Autowired
    private Servicio serv;

    @PostMapping("/grabar")
    public Medico grabar(@RequestBody Medico med) {
        return serv.grabar(med);
    }

    @GetMapping("/buscar/{cod}")
    public Medico buscar(@PathVariable String cod) {
        return serv.buscar(cod);
    }

    @GetMapping("/listar")
    public List<Medico> listar() {
        return serv.listar();
    }

    @PutMapping("/actualizar/{cod}")
    public Medico actualizar(@PathVariable String cod, @RequestBody Medico med) {
        return serv.actualizar(cod, med);
    }

    @DeleteMapping("/eliminar/{cod}")
    public void eliminar(@PathVariable String cod) {
        serv.eliminar(cod);
    }
}
