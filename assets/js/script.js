import * as pages from './Pages.js';

document.getElementById("btn_register").addEventListener("click", registerForm);
document.getElementById("btn_login").addEventListener("click", loginForm);

var container = document.querySelector(".front_div")
var login_form = document.querySelector(".login_form")
var register_form = document.querySelector(".register_form")
var login_back = document.querySelector(".login_back_div")
var register_back = document.querySelector(".register_back_div")

function loginForm(){
    register_form.style.display = "none";
    container.style.left = "40px";
    login_form.style.display = "block";
    register_back.style.opacity = "1";
    login_back.style.opacity = "0";
}

function registerForm(){
    register_form.style.display = "block";
    container.style.left = "480px";
    login_form.style.display = "none";
    register_back.style.opacity = "0";
    login_back.style.opacity = "1";
}
