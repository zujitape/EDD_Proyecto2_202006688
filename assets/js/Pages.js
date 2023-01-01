import { hashCats } from './admin.js'
import * as active from './activeUser.js'

document.getElementById("btn_salir").addEventListener("click", showIndex);
document.getElementById("btn_salir1").addEventListener("click", showIndex);
document.getElementById("backHome").addEventListener("click", showIndex);
document.getElementById("backHome1").addEventListener("click", showIndex);
document.getElementById("backHome2").addEventListener("click", showIndex);
document.getElementById("backHome3").addEventListener("click", showIndex);
document.getElementById("backHome4").addEventListener("click", showIndex);
document.getElementById("backHome5").addEventListener("click", showIndex);

document.getElementById("movie").addEventListener("click", showPrincipal);
document.getElementById("movie1").addEventListener("click", showPrincipal);
document.getElementById("movie2").addEventListener("click", showPrincipal);
document.getElementById("movie3").addEventListener("click", showPrincipal);
document.getElementById("actor").addEventListener("click", showActors);
document.getElementById("actor1").addEventListener("click", showActors);
document.getElementById("actor2").addEventListener("click", showActors);
document.getElementById("actor3").addEventListener("click", showActors);
document.getElementById("category").addEventListener("click", showCategory);
document.getElementById("category1").addEventListener("click", showCategory);
document.getElementById("category2").addEventListener("click", showCategory);
document.getElementById("category3").addEventListener("click", showCategory);


//admin
document.getElementById("btn_principal").addEventListener("click", showAdmin);
document.getElementById("btn_blockchain").addEventListener("click", showBC);
document.getElementById("btn_download").addEventListener("click", download);



var adminPage = document.querySelector(".admin")
var indexPage = document.querySelector(".index")
var bcPage = document.querySelector(".blockchain")
var principalPage = document.querySelector(".principal_user")
var moviePage = document.querySelector(".movie_user")
var actorPage = document.querySelector(".actor_user")
var categoryPage = document.querySelector(".category_user")

export function showAdmin(){
    adminPage.style.display = "block";
    indexPage.style.display = "none";
    bcPage.style.display = "none";
    principalPage.style.display = "none";
    moviePage.style.display = "none";
    actorPage.style.display = "none";
    categoryPage.style.display = "none";
}

export function showIndex(){
    adminPage.style.display = "none";
    indexPage.style.display = "block";
    bcPage.style.display = "none";
    principalPage.style.display = "none";
    moviePage.style.display = "none";
    actorPage.style.display = "none";
    categoryPage.style.display = "none";
}

export function showBC(){
    adminPage.style.display = "none";
    indexPage.style.display = "none";
    bcPage.style.display = "block";
    principalPage.style.display = "none";
    moviePage.style.display = "none";
    actorPage.style.display = "none";
    categoryPage.style.display = "none";
}

export function showPrincipal(){
    adminPage.style.display = "none";
    indexPage.style.display = "none";
    bcPage.style.display = "none";
    principalPage.style.display = "block";
    moviePage.style.display = "none";
    actorPage.style.display = "none";
    categoryPage.style.display = "none";
    active.showAsc()
    active.addButtons()
    active.addButtonsR()
    
}

export function showActors(){
    adminPage.style.display = "none";
    indexPage.style.display = "none";
    bcPage.style.display = "none";
    principalPage.style.display = "none";
    moviePage.style.display = "none";
    actorPage.style.display = "block";
    categoryPage.style.display = "none";
    active.showInorden()
    
}

export function showCategory(){
    adminPage.style.display = "none";
    indexPage.style.display = "none";
    bcPage.style.display = "none";
    principalPage.style.display = "none";
    moviePage.style.display = "none";
    actorPage.style.display = "none";
    categoryPage.style.display = "block";
    active.showCats()
}


function download(){
	saveSvgAsPng(document.getElementsByTagName("svg")[0],"img.png")
}



/* ------------------------ MOVIE INFORMATION */

export function showMovies(){
    adminPage.style.display = "none";
    indexPage.style.display = "none";
    bcPage.style.display = "none";
    principalPage.style.display = "none";
    moviePage.style.display = "block";
}

export function clearRegisterForm(){
    document.querySelector("#txtUser").value = "";
    document.querySelector('#txtNombre').value = "";
    document.querySelector('#txtDpi').value = "";
    document.querySelector('#txtTel').value = "";
    document.querySelector('#txtPass').value = "";
}

export function clearLoginForm(){
    document.querySelector("#txtUser_").value = "";
    document.querySelector('#txtPass_').value = "";
}
