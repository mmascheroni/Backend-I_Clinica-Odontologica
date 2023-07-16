package com.backend.integrador.service.impl;

import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.entity.Odontologo;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.repository.OdontologoRepository;
import com.backend.integrador.service.IOdontologoService;
import com.backend.integrador.utils.JsonPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OdontologoService implements IOdontologoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(OdontologoService.class);

    private final OdontologoRepository odontologoRepository;

    private ObjectMapper objectMapper;

    @Autowired
    public OdontologoService(OdontologoRepository odontologoRepository, ObjectMapper objectMapper) {
        this.odontologoRepository = odontologoRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public OdontologoDto guardarOdontologo(Odontologo odontologo) {
        Odontologo odontologoAPersistir = odontologoRepository.save(odontologo);
        LOGGER.info("Odontologo registado: {}", JsonPrinter.toString(odontologoAPersistir));

        return objectMapper.convertValue(odontologoAPersistir, OdontologoDto.class);
    }

    @Override
    public OdontologoDto buscarOdontologoPorId(Long id) {
        Odontologo odontologoBuscado = odontologoRepository.findById(id).orElse(null);
        OdontologoDto odontologoDto = null;

        if ( odontologoBuscado != null ) {
            odontologoDto = objectMapper.convertValue(odontologoBuscado, OdontologoDto.class);
            LOGGER.info("Odontologo encontrado: {}", JsonPrinter.toString(odontologoDto));
        } else {
            LOGGER.error("El odontologo buscado con id {}, no se encuentra registrado en la base de datos", id);
        }
        return odontologoDto;
    }

    @Override
    public List<OdontologoDto> buscarOdontologoPorCriterio(String criterio) throws ResourceNotFoundException {
        List<Odontologo> odontologosBuscados = odontologoRepository.buscarOdontologoPorCriterio(criterio);

        List<OdontologoDto> odontologosDtos = odontologosBuscados.stream().map(odontologo -> {
            return new OdontologoDto(odontologo.getId(), odontologo.getNombre(), odontologo.getApellido(), odontologo.getMatricula());
        }).toList();

        if ( odontologosDtos.size() > 0 ) {
            LOGGER.info("Listado de odonotologos que coinciden con el criterio de busqueda {}: {}", criterio, JsonPrinter.toString(odontologosDtos));
            return odontologosDtos;
        } else {
            LOGGER.error("No se ha encontrado odontologo que coincida con el criterio de busqueda ingresado: " + criterio);
            throw new ResourceNotFoundException("No se ha encontrado odontologo que coincida con el criterio de busqueda ingresado: " + criterio);
        }
    }

    @Override
    public List<OdontologoDto> listarOdontologos() {
        List<Odontologo> odontologos = odontologoRepository.findAll();

        List<OdontologoDto> odontologosDtos = odontologos.stream()
                .map(odontologo -> {
                    return new OdontologoDto(odontologo.getId(), odontologo.getNombre(), odontologo.getApellido(), odontologo.getMatricula());
                }).toList();

        if ( odontologosDtos.size() > 0 ) {
            LOGGER.info("Listado de odontologos: {}", JsonPrinter.toString(odontologosDtos));
        } else {
            LOGGER.warn("No existe odontologo registrado en la base de datos: {}", JsonPrinter.toString(odontologosDtos));
        }

        return odontologosDtos;
    }

    @Override
    public OdontologoDto actualizarOdontologo(Odontologo odontologo) throws ResourceNotFoundException {
        Odontologo odontologoActualizar = odontologoRepository.findById(odontologo.getId()).orElse(null);
        OdontologoDto odontologoDto = null;

        if ( odontologoActualizar != null ) {
            odontologoActualizar = odontologo;
            odontologoRepository.save(odontologoActualizar);
            odontologoDto = objectMapper.convertValue(odontologoActualizar, OdontologoDto.class);
            LOGGER.info("Odontologo actualizado con exito: {}", JsonPrinter.toString(odontologoDto));
            return odontologoDto;
        } else {
            LOGGER.error("No fue posible actualizar los datos, ya que el odontologo no se encuentra registrado");
            throw new ResourceNotFoundException("No se encontro registro del odontologo en la base de datos, por lo que no fue posible actualizar");
        }
    }

    @Override
    public void eliminarOdontologo(Long id) throws ResourceNotFoundException {
        if ( buscarOdontologoPorId(id) != null ) {
            odontologoRepository.deleteById(id);
            LOGGER.warn("Se ha eliminado el odontologo con id: {}", id);
        } else {
            LOGGER.error("No se encontro registro de odontologo con id: {}", id);
            throw new ResourceNotFoundException("\"No se encontro registro de odontologo con id: " + id);
        }
    }
}
