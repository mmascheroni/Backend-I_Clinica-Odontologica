package com.backend.integrador.service;

import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.entity.Odontologo;
import com.backend.integrador.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IOdontologoService {

    OdontologoDto guardarOdontologo(Odontologo odontologo);

    OdontologoDto buscarOdontologoPorId(Long id);

    List<OdontologoDto> buscarOdontologoPorCriterio(String criterio) throws ResourceNotFoundException;

    List<OdontologoDto> listarOdontologos();

    OdontologoDto actualizarOdontologo(Odontologo odontologo) throws ResourceNotFoundException;

    void eliminarOdontologo(Long id) throws ResourceNotFoundException;

}
