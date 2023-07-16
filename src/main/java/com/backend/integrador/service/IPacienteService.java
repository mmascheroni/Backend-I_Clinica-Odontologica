package com.backend.integrador.service;


import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.entity.Paciente;
import com.backend.integrador.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IPacienteService {

    PacienteDto guardarPaciente(Paciente paciente);

    PacienteDto buscarPacientePorId(Long id);

    List<PacienteDto> buscarPacientePorCriterio(String criterio) throws ResourceNotFoundException;

    List<PacienteDto> listarPacientes();

    PacienteDto actualizarPaciente(Paciente paciente) throws ResourceNotFoundException;

    void eliminarPaciente(Long id) throws ResourceNotFoundException;
}
