package com.backend.integrador.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Entity
@Table(name = "TURNOS")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "paciente_id", nullable = false)
    @NotNull(message = "El paciente no puede ser nulo")
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "odontologo_id", nullable = false)
    @NotNull(message = "El odontologo no puede ser nulo")
    private Odontologo odontologo;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @FutureOrPresent(message = "La fecha y hora no puede ser anterior al día de hoy, ni a la hora actual")
    @NotNull(message = "Debe especificarse la fecha y hora del turno")
    private LocalDateTime fechaYHora;


    //Constructor vacio
    public Turno() {
    }

    // Constructor sin id
    public Turno(Paciente paciente, Odontologo odontologo, LocalDateTime fechaYHora) {
        this.paciente = paciente;
        this.odontologo = odontologo;
        this.fechaYHora = fechaYHora;
    }

    // Getter id
    public Long getId() {
        return id;
    }

    // Getters and Setters
    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Odontologo getOdontologo() {
        return odontologo;
    }

    public void setOdontologo(Odontologo odontologo) {
        this.odontologo = odontologo;
    }

    public LocalDateTime getFechaYHora() {
        return fechaYHora;
    }

    public void setFechaYHora(LocalDateTime fechaYHora) {
        this.fechaYHora = fechaYHora;
    }
}
