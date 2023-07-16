package com.backend.integrador.service.impl;

import com.backend.integrador.dto.DomicilioDto;
import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.entity.Paciente;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.repository.PacienteRepository;
import com.backend.integrador.service.IPacienteService;
import com.backend.integrador.utils.JsonPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService implements IPacienteService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PacienteService.class);

    private final PacienteRepository pacienteRepository;

    private ObjectMapper objectMapper;

    @Autowired
    public PacienteService(PacienteRepository pacienteRepository, ObjectMapper objectMapper) {
        this.pacienteRepository = pacienteRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public PacienteDto guardarPaciente(Paciente paciente) {
        Paciente pacienteAPersistir = pacienteRepository.save(paciente);
        DomicilioDto domicilioDto = objectMapper.convertValue(paciente.getDomicilio(), DomicilioDto.class);

        PacienteDto pacienteDto = objectMapper.convertValue(pacienteAPersistir, PacienteDto.class);
        pacienteDto.setDomicilio(domicilioDto);

        LOGGER.info("Se registro el paciente: {}", JsonPrinter.toString(pacienteDto));

        return pacienteDto;
    }

    @Override
    public PacienteDto buscarPacientePorId(Long id) {
        Paciente pacienteBuscado = pacienteRepository.findById(id).orElse(null);
        PacienteDto pacienteDto = null;

        if ( pacienteBuscado != null ) {
            pacienteDto = objectMapper.convertValue(pacienteBuscado, PacienteDto.class);
            LOGGER.info("Paciente encontrado: {}", JsonPrinter.toString(pacienteDto));
        } else {
            LOGGER.error("El paciente con id: {} no se encuentra registrado en la base de datos", id);
        }

        return pacienteDto;
    }

    @Override
    public List<PacienteDto> buscarPacientePorCriterio(String criterio) throws ResourceNotFoundException {
        List<Paciente> pacientes = pacienteRepository.buscarPacientePorCriterio(criterio);

        List<PacienteDto> pacientesDtos = pacientes.stream().map(paciente -> {
            DomicilioDto domicilioDto = objectMapper.convertValue(paciente.getDomicilio(), DomicilioDto.class);

            return new PacienteDto(paciente.getId(), paciente.getNombre(), paciente.getApellido(), paciente.getDni(), paciente.getFechaIngreso(), domicilioDto);
        }).toList();

        if ( pacientesDtos.size() > 0 ) {
            LOGGER.info("Listado de Pacientes encontrados con el criterio de busqueda '" + criterio + "': " + JsonPrinter.toString(pacientesDtos));
            return pacientesDtos;
        } else {
            LOGGER.error("No se ha encontrado registro de Paciente con criterio de busqueda ingresado:  " + criterio);
            throw new ResourceNotFoundException("No se ha encontrado registro de Paciente con criterio de busqueda ingresado:  " + criterio);
        }
    }

    @Override
    public List<PacienteDto> listarPacientes() {
        List<Paciente> pacientes = pacienteRepository.findAll();

        List<PacienteDto> pacientesDtos = pacientes.stream().map(paciente -> {
            DomicilioDto domicilioDto = objectMapper.convertValue(paciente.getDomicilio(), DomicilioDto.class);

            return new PacienteDto(paciente.getId(), paciente.getNombre(), paciente.getApellido(), paciente.getDni(), paciente.getFechaIngreso(), domicilioDto);
        }).toList();

        if ( pacientesDtos.size() > 0 ) {
            LOGGER.info("Listado de pacientes: {}", JsonPrinter.toString(pacientesDtos));
        } else {
            LOGGER.warn("No existe paciente registrado en la base de datos: {}", JsonPrinter.toString(pacientesDtos));
        }

        return pacientesDtos;
    }

    @Override
    public PacienteDto actualizarPaciente(Paciente paciente) throws ResourceNotFoundException {
        Paciente pacienteAActualizar = pacienteRepository.findById(paciente.getId()).orElse(null);
        PacienteDto pacienteActualizadoDto = null;

        if (pacienteAActualizar != null) {
            if (paciente.getDomicilio().getCalle() == null || paciente.getDomicilio().getLocalidad() == null) {
                DomicilioDto domicilioDto = objectMapper.convertValue(pacienteAActualizar.getDomicilio(), DomicilioDto.class);
                paciente.setDomicilio(pacienteAActualizar.getDomicilio());
                pacienteAActualizar = paciente;
                pacienteRepository.save(pacienteAActualizar);

                pacienteActualizadoDto = objectMapper.convertValue(pacienteAActualizar, PacienteDto.class);
                pacienteActualizadoDto.setDomicilio(domicilioDto);

            } else {
                pacienteAActualizar = paciente;
                pacienteRepository.save(pacienteAActualizar);

                DomicilioDto domicilioDto = objectMapper.convertValue(pacienteAActualizar.getDomicilio(), DomicilioDto.class);
                pacienteActualizadoDto = objectMapper.convertValue(pacienteAActualizar, PacienteDto.class);
                pacienteActualizadoDto.setDomicilio(domicilioDto);
            }

            LOGGER.info("Paciente actualizado con exito: {}", JsonPrinter.toString(pacienteActualizadoDto));
            return pacienteActualizadoDto;
        } else {
            LOGGER.error("No fue posible actualizar los datos ya que el paciente no se encuentra registrado");
            throw new ResourceNotFoundException("No se encontro registro del paciente en la base de datos, por lo que no fue posible actualizar");
        }
    }


    @Override
    public void eliminarPaciente(Long id) throws ResourceNotFoundException {
        if ( buscarPacientePorId(id) != null ) {
            pacienteRepository.deleteById(id);
            LOGGER.warn( "Se ha eliminado el paciente con id: {}", id );
        } else {
            LOGGER.error( "No se ha encontrado registro de paciente con id: {}", id );
            throw new ResourceNotFoundException( "No se encontro registro de paciente con id " + id );
        }
    }
}
