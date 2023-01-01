import {lstClientes, activeUser} from "./script.js";
import Cliente from "./Cliente.js";
import Actor from "./Actor.js";
import Movie from "./Pelicula.js";
import Categoria from "./Categoria.js";
import ABB from "./ArbolBinario.js";
import AVL from "./AVL.js";
import Hash from "./Hash.js";

document.getElementById('clientFile').addEventListener('change', onChange)
document.getElementById('actorFile').addEventListener('change', onChange)
document.getElementById('movieFile').addEventListener('change', onChange)
document.getElementById('catFile').addEventListener('change', onChange)
document.getElementById('btn_clientGraph').addEventListener("click", graphClients)
document.getElementById('btn_actorGraph').addEventListener("click", graphActors)
document.getElementById('btn_movieGraph').addEventListener("click", graphMovies)
document.getElementById('btn_categoryGraph').addEventListener("click", graphCats)

var abbActores = new ABB()
var hashCats = new Hash(20)
//gráficas
var avlID = new AVL()

//ordenamientos
var avlName = new AVL()

function onChange(event) {
    try{
        var reader = new FileReader();
        switch(this.id){
            case 'clientFile':
                console.log("?")
                reader.onload = getClients;
                alert('Archivo cargado correctamente')
                console.log(lstClientes)
                break
            case 'actorFile':
                reader.onload = getActors;
                alert('Archivo cargado correctamente')
                console.log(abbActores)
                break
            case 'movieFile':
                reader.onload = getMovies;
                alert('Archivo cargado correctamente')
                console.log(avlID)
                break
            case 'catFile':
                reader.onload = getCategories;
                alert('Archivo cargado correctamente')
                console.log(hashCats)
                break
        }
        reader.readAsText(event.target.files[0]);
    }catch(error){
        alert('Asegúrate de cargar un archivo correcto.')
        console.error(error)
    }
    
}

function getClients(event){
    var data = JSON.parse(event.target.result);
    var size = Object.keys(data).length
    for(var i = 0; i <size;i++){
        var newClient = new Cliente(data[i].dpi, data[i].nombre_completo, data[i].nombre_usuario, sha256(data[i].contrasenia), data[i].correo, data[i].telefono, data[i].admin)
        lstClientes.agregar(newClient)
    }
}

function getActors(event){
    var data = JSON.parse(event.target.result);
    var size = Object.keys(data).length
    for(var i = 0; i <size;i++){ 
        var newActor = new Actor(data[i].dni, data[i].nombre_actor, data[i].correo, data[i].descripcion)
        abbActores.agregarNodo(newActor)
    }
}

function getMovies(event){
    var data = JSON.parse(event.target.result);
    var size = Object.keys(data).length
    for(var i = 0; i <size;i++){ 
        var newMovie = new Movie(data[i].id_pelicula, data[i].nombre_pelicula, data[i].descripcion, data[i].puntuacion_star, data[i].precion_Q, data[i].paginas, data[i].categoria)
        
        //para las gráficas
        avlID.agregarNodoID(newMovie)
        //para los ordenamientos
        avlName.agregarNodoNombre(newMovie)
    }
}

function getCategories(event){
    var data = JSON.parse(event.target.result);
    var size = Object.keys(data).length
    for(var i = 0; i <size;i++){ 
        var newCategory = new Categoria(data[i].id_categoria, data[i].company)
        hashCats.agregar(newCategory)
    }
}

function graphMovies(){
    avlID.graficar()
}


function graphClients(){
    lstClientes.generarDot()
}

function graphActors(){
    abbActores.graficar()
}

function graphCats(){
    hashCats.graficar()
}
export {abbActores, avlID, avlName, hashCats}
