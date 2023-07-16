package com.backend.integrador.repository;

import com.backend.integrador.entity.Odontologo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OdontologoRepository extends JpaRepository<Odontologo, Long> {

    @Query("SELECT o FROM Odontologo o WHERE o.id LIKE %:criterio% OR LOWER(o.nombre) LIKE LOWER(concat('%', :criterio, '%')) OR LOWER(o.apellido) LIKE LOWER(concat('%', :criterio, '%')) OR LOWER(o.matricula) LIKE LOWER(concat('%', :criterio, '%'))")
    List<Odontologo> buscarOdontologoPorCriterio(@Param("criterio") String criterio);
}
