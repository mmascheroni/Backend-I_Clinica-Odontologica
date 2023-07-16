package com.backend.integrador.controller;


import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.entity.Paciente;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.service.impl.PacienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("pacientes")
@CrossOrigin
public class PacienteController {

    private PacienteService pacienteService;

    @Autowired
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    // Methods GET
    @Operation(summary = "Listado de todos los pacientes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listado de pacientes obtenido correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = PacienteDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping()
    public List<PacienteDto> listarPacientes() {
        return pacienteService.listarPacientes();
    }

    @Operation(summary = "Búsqueda paciente por Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Paciente obtenido correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = PacienteDto.class))}),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPacientePorId(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<PacienteDto> respuesta;
        PacienteDto pacienteDto = pacienteService.buscarPacientePorId(id);

        if ( pacienteDto != null ) {
            respuesta = new ResponseEntity<>(pacienteDto, null, HttpStatus.OK);
            return respuesta;
        } else {
            throw new ResourceNotFoundException("No se ha encontrado registro de paciente con id: " + id);
        }

    }

    @Operation(summary = "Búsqueda de pacientes por criterio")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pacientes obtenidos correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = PacienteDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paciente")
    public List<PacienteDto> buscarPacientePorCriterio(@RequestParam String criterio) throws ResourceNotFoundException {
        List<PacienteDto> pacientesDtos = pacienteService.buscarPacientePorCriterio(criterio);
        return pacientesDtos;
    }


    // Method POST
    @Operation(summary = "Registrar paciente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Paciente creado correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = PacienteDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/registrar")
    public ResponseEntity<PacienteDto> registarPaciente(@Valid @RequestBody Paciente paciente) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteService.guardarPaciente(paciente));
    }

    // Method PUT
    @Operation(summary = "Actualización de un paciente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Paciente actualizado correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = PacienteDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/actualizar")
    public ResponseEntity<PacienteDto> actualizarPaciente(@Valid @RequestBody Paciente paciente) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(pacienteService.actualizarPaciente(paciente));
    }

    // Method DELETE
    @Operation(summary = "Eliminar paciente por Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Paciente eliminado correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarPaciente(@PathVariable Long id) throws ResourceNotFoundException {
        pacienteService.eliminarPaciente(id);
        return ResponseEntity.ok("Paciente eliminado");
    }
}
