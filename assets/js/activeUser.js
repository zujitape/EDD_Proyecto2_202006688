import { activeUser } from "./script.js";
import { avlID, avlName, abbActores, hashCats } from "./admin.js";
import * as pages from './Pages.js';
import Comentario from './Comentario.js'
import Rentada from './Rentada.js'
import Merkle from "./Merkle.js";
import Blockchain from "./Blockchain.js"

var merkle = new Merkle()
var blockchn = new Blockchain()

//actores
document.getElementById("btn_inorden").addEventListener("click", showInorden);
document.getElementById("btn_preorden").addEventListener("click", showPreorden);
document.getElementById("btn_postorden").addEventListener("click", showPostorden);

//películas
document.getElementById("btn_asc").addEventListener("click", showAsc);
document.getElementById("btn_desc").addEventListener("click", showDesc);

//película
var movie_info = document.getElementsByClassName("infobtns")
var rent_movie = document.getElementsByClassName("rentbtns")
var currentm_id = ""
var current = ""
var time = 300000

var time_interval = setInterval(() =>{
  blockchn.generarBloque();
  console.log(blockchn)
}, time )

function star_rank(){
   currentm_id = document.getElementsByClassName("title")[0].id;
   current = avlID.existe(currentm_id);
   console.log(current)
   var user_punct = document.querySelectorAll('input[type="checkbox"]:checked').length;
   if (user_punct > 0){
      current.valor.punct = user_punct
      alert("Gracias por calificar esta película!")
   }else{
      alert("Da una puntuación válida por favor!")
   }
}

function comment(){
  currentm_id = document.getElementsByClassName("title")[0].id;
  current = avlID.existe(currentm_id)
  console.log(current)
  var user_comment = document.getElementById("comment").value
  var newComment = new Comentario(activeUser.valor.username, user_comment)
  current.comments.agregar(newComment)
  console.log("con comentarios")
  console.log(current)
  alert("Gracias por tu comentario!")
  document.getElementById("comment").value = ""
}

function rentMovie(){
  currentm_id = document.getElementsByClassName("title")[0].id;
  current = avlID.existe(currentm_id)
  alert("Película " + current.valor.id + " - " + current.valor.nombre + " rentada!")
  activeUser.rentadas.agregar(current.valor)
  var movie_name = activeUser.valor.nombre
  var user_name = current.valor.nombre
  var price = current.valor.precio
  var newCompra = new Rentada(movie_name, user_name, price)
  merkle.agregar(newCompra)
  console.log(merkle)
}


const viewMovie = e => {
    var i = e.target.id
    pages.showMovies()
    document.getElementById('moviei').innerHTML = ''
    var current = avlID.mostrarPelicula(i)
    console.log("Viendo información de: ")
    console.log(current)
    document.getElementById("moviei").innerHTML+= current
    document.getElementById("send_q").addEventListener("click", star_rank);
    document.getElementById("send_comment").addEventListener("click", comment);
    document.getElementById("btn_rent_individual").addEventListener("click", rentMovie);
}

export function addButtons(){
  for (let button of movie_info) {
      button.addEventListener("click", viewMovie);
  }
}

const getMovie = e => {
  var i = e.target.id
  var current = avlID.existe(i)
  alert("Película " + current.valor.id + " - " + current.valor.nombre + " rentada!")
  activeUser.rentadas.agregar(current)
  console.log(activeUser)
  var movie_name = activeUser.valor.nombre
  var user_name = current.valor.nombre
  var price = current.valor.precio
  var newCompra = new Rentada(movie_name, user_name, price)
  merkle.agregar(newCompra)
  console.log(merkle)
}

export function addButtonsR(){
    for (let button of rent_movie) {
        button.addEventListener("click", getMovie);
    }
  }

export function showPostorden(){
    document.getElementById('actors').innerHTML = ''
    document.getElementById("actors").innerHTML+= abbActores.showDivsPostorden(abbActores.raiz)
}

export function showPreorden(){
    document.getElementById('actors').innerHTML = ''
    document.getElementById("actors").innerHTML+= abbActores.showDivsPreorden(abbActores.raiz)
}

export function showInorden(){
    document.getElementById('actors').innerHTML = ''
    document.getElementById("actors").innerHTML+= abbActores.showDivsInorden(abbActores.raiz)
}

export function showAsc(){
    document.getElementById('movies').innerHTML = ''
    document.getElementById("movies").innerHTML+= avlName.showDivsAsc(avlID.raiz)
    addButtons()
    addButtonsR()
}

export function showDesc(){
    document.getElementById('movies').innerHTML = ''
    document.getElementById("movies").innerHTML+= avlName.showDivsDesc(avlID.raiz)
    addButtons()
    addButtonsR()
}

export function showCats(){
  document.getElementById('categories').innerHTML = ''
  document.getElementById('categories').innerHTML += hashCats.mostrarCategorias()
}
