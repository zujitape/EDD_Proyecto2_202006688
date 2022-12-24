import Lista from './ListaSimple.js';

export default class Movie{
    constructor(id, nombre, precio, pages, categoria, punct){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.pages = pages
        this.categoria = categoria
        this.punct = punct
        this.comments = ListaSimple()
        this.rentada = false
    }
}