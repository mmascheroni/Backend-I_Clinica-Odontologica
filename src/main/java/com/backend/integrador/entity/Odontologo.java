package com.backend.integrador.entity;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name = "ODNTOLOGOS")
public class Odontologo {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50, message = "El nombre no puede ser mayor a 50 caracteres")
    @NotNull(message = "El nombre no puede ser nulo")
    @NotBlank(message = "Debe especificarse el nombre del odontologo, no puede quedar vacio")
    private String nombre;

    @Size(max = 50, message = "El apellido no puede ser mayor a 50 caracteres")
    @NotNull(message = "El apellido no puede ser nulo")
    @NotBlank(message = "Debe especificarse el apellido del odontologo, no puede quedar vacio")
    private String apellido;

    @Size(max = 50, message = "La matricula no puede ser mayor a 50 caracteres")
    @NotNull(message = "La matricula no puede ser nula")
    @NotBlank(message = "Debe especificarse la matricula del odontologo, no puede quedar vacia")
    private String matricula;

    // Constructor Vacio

    public Odontologo() {
    }

    // Constructior sin id

    public Odontologo(String nombre, String apellido, String matricula) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
    }

    // Get id

    public Long getId() {
        return id;
    }


    // Getter y setters

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }
}
