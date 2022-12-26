import {lstClientes, activeUser} from "./script.js";
import Cliente from "./Cliente.js";
import Actor from "./Actor.js";
import ABB from "./ArbolBinario.js";

document.getElementById('clientFile').addEventListener('change', onChange)
document.getElementById('actorFile').addEventListener('change', onChange)
document.getElementById('btn_clientGraph').addEventListener("click", graphClients)
document.getElementById('btn_actorGraph').addEventListener("click", graphActors)

var abbActores = new ABB()

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
                console.log(abbActores)
                break
            case 'musicFile':
                reader.onload = getSongs;
                break
            case 'programmedFile':
                reader.onload = getProgrammed;
                break
            case 'podcastFile':
                reader.onload = getPodcasts;
                console.log(abbPodcast)
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

function graphClients(){
    lstClientes.generarDot()
}

function graphActors(){
    abbActores.graficar()
}

export {abbActores}
