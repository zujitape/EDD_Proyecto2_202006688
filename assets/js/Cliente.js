export default class Cliente{
    constructor(dpi, nombre, username, pass, email, phone, admin){
        this.dpi = dpi;
        this.nombre = nombre;
        this.username = username;
        this.pass = pass;
        this.email = email;
        this.phone = phone;
        this.admin = admin || false;
    }
}