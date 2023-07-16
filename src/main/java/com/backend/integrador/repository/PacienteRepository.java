package com.backend.integrador.repository;

import com.backend.integrador.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    @Query("SELECT p FROM Paciente p WHERE p.id LIKE %:criterio% OR LOWER(p.nombre) LIKE LOWER(concat('%', :criterio, '%')) OR LOWER(p.apellido) LIKE LOWER(concat('%', :criterio, '%')) OR LOWER(p.dni) LIKE LOWER(concat('%', :criterio, '%')) OR LOWER(p.domicilio.calle) LIKE LOWER(concat('%', :criterio, '%')) OR LOWER(p.domicilio.localidad) LIKE LOWER(concat('%', :criterio, '%'))")
    List<Paciente> buscarPacientePorCriterio(@Param("criterio") String criterio);
}
