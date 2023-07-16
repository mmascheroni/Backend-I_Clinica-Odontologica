package com.backend.integrador.controller;

import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.dto.TurnoDto;
import com.backend.integrador.entity.Turno;
import com.backend.integrador.exceptions.BadRequestException;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.service.impl.TurnoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("turnos")
@CrossOrigin
public class TurnoController {

    private TurnoService turnoService;

    @Autowired
    public TurnoController(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    // Methods GET
    @Operation(summary = "Listado de todos los turnos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listado de turnos obtenido correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = TurnoDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @GetMapping()
    public List<TurnoDto> listarTurnos() {
        return turnoService.listarTodos();
    }

    @Operation(summary = "Búsqueda de turno por Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Turnos obtenidos correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = TurnoDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<TurnoDto> buscarTurnoPorId(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(turnoService.buscarTurnoPorId(id));
    }

    @Operation(summary = "Búsqueda de turno por criterio")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Turnos obtenidos correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = TurnoDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @GetMapping("/turno")
    public List<TurnoDto> buscarTurnosPorCriterio(@RequestParam String criterio) throws ResourceNotFoundException {
        List<TurnoDto> turnosDtos = turnoService.buscarTurnosPorCriterio(criterio);
        return turnosDtos;
    }

    // POST
    @Operation(summary = "Registrar turno")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Turno creado correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = TurnoDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarTurno(@Valid @RequestBody Turno turno) throws BadRequestException {
        return ResponseEntity.status(HttpStatus.CREATED).body(turnoService.guardarTurno(turno));
    }

    // PUT
    @Operation(summary = "Actualización de un turno")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Turno actualizado correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = TurnoDto.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Turno no encontrado",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarTurno(@Valid @RequestBody Turno turno) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(turnoService.actualizarTurno(turno));
    }

    // DELETE
    @Operation(summary = "Eliminar turno por Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Turno eliminado correctamente",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Turno no encontrado",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Server error",
                    content = @Content)
    })
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarTurno(@PathVariable Long id) throws ResourceNotFoundException {
        turnoService.eliminarTurno(id);
        return ResponseEntity.ok("El turno ha sido eliminado correctamente");
    }

}
