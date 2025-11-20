/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Clinica.ApiMedico;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kevin
 */
public interface Repositorio extends JpaRepository<Medico, Long>{
    
}
