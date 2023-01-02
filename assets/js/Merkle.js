class DataNode {
	constructor(valor) {
		this.valor 	= valor
	}
}

class HashNode {
  constructor(hash) {
    this.hash  = hash
    this.izquierda  = null
    this.derecha = null
  }
}

//sha256 inicia con 00
//orden exponencial 2 - va por pares

export default class Merkle {
  constructor() {
    this.tophash = null //hash de la raiz
    this.size = 0
    this.datablock = []    
    this.index = 0
}

  agregar(value) {
    this.datablock[this.size]= new DataNode(value) //para evitar que los 1s queden sueltos :c
    this.size++;
  }

  crear(exp) {
    this.tophash = new HashNode(0)
    this.crearArbol(this.tophash, exp )
  }

  crearArbol(tmp, exp) {
    if (exp > 0) {
      tmp.izquierda = new HashNode(0)
      tmp.derecha = new HashNode(0)
      this.crearArbol(tmp.izquierda, exp - 1)
      this.crearArbol(tmp.derecha, exp - 1)
    }
  }

  generarHash(tmp, n) { 
    if (tmp != null) {
      this.generarHash(tmp.izquierda, n)
      this.generarHash(tmp.derecha, n)  
      
      if (tmp.izquierda == null && tmp.derecha == null) {
        tmp.izquierda = this.datablock[n-this.index--]
        if(tmp.izquierda != 1){
            console.log(tmp.izquierda)
            tmp.hash =sha256(tmp.izquierda.valor.user+" - "+ tmp.izquierda.valor.movie)
        }
      } else {
        tmp.hash = sha256((tmp.izquierda.valor.user+" - "+ tmp.izquierda.valor.movie)+""+(tmp.derecha.valor.user_name+" - "+ tmp.derecha.valor.movie_name))
      }      
    }
  }

  auth() {
    console.log(this.datablock)

    var exp = 1 //nivel del árbol - 
    while (Math.pow(2, exp) < this.datablock.length) {  //merkle de grado 2
      exp += 1
    }
    for (var i = this.datablock.length; i < Math.pow(2, exp); i++) {
      this.datablock.push(1) //llenar merkle con valores 1
    }
    this.index = Math.pow(2, exp) //cuántos datos tenemos :b
    this.crear(exp)
    this.generarHash(this.tophash, Math.pow(2, exp))
  }

  clear(){
    this.tophash = null
    this.datablock = []  
  }
}
