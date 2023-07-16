package com.backend.integrador.service;

import com.backend.integrador.dto.TurnoDto;
import com.backend.integrador.entity.Turno;
import com.backend.integrador.exceptions.BadRequestException;
import com.backend.integrador.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ITurnoService {

    TurnoDto guardarTurno(Turno turno) throws BadRequestException;

    TurnoDto buscarTurnoPorId(Long id) throws ResourceNotFoundException;

    List<TurnoDto> buscarTurnosPorCriterio(String criterio) throws ResourceNotFoundException;

    List<TurnoDto> listarTodos();

    TurnoDto actualizarTurno(Turno turno) throws ResourceNotFoundException;

    void eliminarTurno(Long id) throws ResourceNotFoundException;

}
