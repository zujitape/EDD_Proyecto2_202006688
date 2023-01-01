import * as pages from './Pages.js';
import Cliente from './Cliente.js';
import ListaSimple from './ListaSimple.js';

var user = new Cliente(2340, "karla", "zuji", sha256("2"), 'karla@gmail.com', 234, true);
var user2 = new Cliente(234, "yohann", "toby", sha256("2"), 'toby@gmail.com', 923483, false);
var user3 = new Cliente(234, "loka", "china", sha256("2"),'china@gmail.com', 923483, false);
var user4 = new Cliente(2354168452525, "Oscar Armin", "EDD", sha256("12345678"), 'admin@gmail.com',12345678, true);

var lstClientes = new ListaSimple();
lstClientes.agregar(user)
lstClientes.agregar(user2)
lstClientes.agregar(user3)
lstClientes.agregar(user4)


var activeUser = null

document.getElementById("btn_register").addEventListener("click", registerForm);
document.getElementById("btn_login").addEventListener("click", loginForm);
document.getElementById("register").addEventListener("click", register);
document.getElementById("login").addEventListener("click", login);

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

function register(){
    var username = document.querySelector("#txtUser").value;
    var name = document.querySelector('#txtNombre').value;
    var email = document.querySelector('#txtCorreo').value;
    var dpi = document.querySelector('#txtDpi').value
    var cell = document.querySelector('#txtTel').value
    var pass = sha256(document.querySelector('#txtPass').value)
    var newCliente = new Cliente(dpi, name, username, pass, email, cell)
    lstClientes.agregar(newCliente)
    alert("Usuario agregado correctamente!")
    console.log(lstClientes.generarDot())
    pages.clearRegisterForm()
    loginForm()
}

function login(){
    var username = document.querySelector('#txtUser_').value
    var pass = sha256(document.querySelector('#txtPass_').value)
    activeUser = lstClientes.existe(username, pass)
    if(activeUser){
        if (activeUser.valor.admin){
            alert("Bienvenido "+ activeUser.valor.username +"!")
            pages.clearLoginForm()
            pages.showAdmin()
        }else if(!activeUser.valor.admin){
            alert("Bienvenido "+ activeUser.valor.username +"!")
            pages.clearLoginForm()
            pages.showPrincipal()
            console.log(activeUser)
        }
    }else{
        alert("Asegúrate de ingresar las credenciales correctamente")
        console.log(lstClientes)
        
    }
}

export {lstClientes, activeUser};

