package com.backend.integrador.dto;

public class DomicilioDto {

    private Long id;
    private String calle;
    private int numero;
    private String localidad;

    // Constructor vacio
    public DomicilioDto() {
    }

    // Cosntructor son id
    public DomicilioDto(Long id, String calle, int numero, String localidad) {
        this.id = id;
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }
}
