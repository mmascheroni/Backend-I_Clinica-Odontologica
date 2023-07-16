package com.backend.integrador.controller;

import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.entity.Odontologo;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.service.impl.OdontologoService;
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
@RequestMapping("odontologos")
@CrossOrigin
public class OdontologoController {

    private OdontologoService odontologoService;

    @Autowired
    public OdontologoController(OdontologoService odontologoService) {
        this.odontologoService = odontologoService;
    }

    // Methods GET
    @Operation(summary = "Listado de todos los odontologos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Recurso obtenido correctamente", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = OdontologoDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Server Error", content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping()
    public List<OdontologoDto> listarOdontologos() {
        return odontologoService.listarOdontologos();
    }


    @Operation(summary = "Buscar odontologo por Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listado de odontologos obtenido correctamente", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = OdontologoDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Odontologo no encontrado", content = @Content),
            @ApiResponse(responseCode = "500", description = "Server Error", content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarOdontologoPorId(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<OdontologoDto> respuesta;
        OdontologoDto odontologoDto = odontologoService.buscarOdontologoPorId(id);

        if ( odontologoDto != null ) {
            respuesta = new ResponseEntity<>(odontologoDto, null, HttpStatus.OK);
            return respuesta;
        } else {
            throw new ResourceNotFoundException("No se ha encontrado registro de odontologo con id: " + id);
        }

    }

    @Operation(summary = "Buscar odontologos por criterio")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Odontologos obtenidos correctamente", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = OdontologoDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Server Error", content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("odontologo")
    public List<OdontologoDto> buscarOdontologoPorCriterio(@RequestParam String criterio) throws ResourceNotFoundException {
        List<OdontologoDto> odontologosDtos = odontologoService.buscarOdontologoPorCriterio(criterio);
        return odontologosDtos;
    }


    // Method POST
    @Operation(summary = "Registrar odontologo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Odontologo creado correctamente", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = OdontologoDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Server Error", content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/registrar")
    public ResponseEntity<OdontologoDto> registarOdontologo(@Valid @RequestBody Odontologo odontologo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(odontologoService.guardarOdontologo(odontologo));
    }

    // Method PUT
    @Operation(summary = "Actualización de odontologo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Odontologo actualizado correctamente", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = OdontologoDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Odontologo no encontrado", content = @Content),
            @ApiResponse(responseCode = "500", description = "Server Error", content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/actualizar")
    public ResponseEntity<OdontologoDto> actualizarOdontologo(@Valid @RequestBody Odontologo odontologo) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(odontologoService.actualizarOdontologo(odontologo));
    }

    // Method DELETE
    @Operation(summary = "Eliminar odontologo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Odontologo eliminado correctamente", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Odontologo no encontrado", content = @Content),
            @ApiResponse(responseCode = "500", description = "Server Error", content = @Content)
    })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        odontologoService.eliminarOdontologo(id);
        return ResponseEntity.ok("Odontologo eliminado");
    }
}
