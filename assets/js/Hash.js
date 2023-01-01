import Lista from "./ListaSimple.js";

export default class Hash{
    constructor(size){
        this.ocupados = 0  //datos que hemos insertado
        this.tabla = []
        this.size = size //tabla "general" encabezados
        for(var i = 0; i < size; i++){
            this.tabla.push(new Lista()) //se inserta una lista a cada posición del arreglo
        } 
    }

    agregar(nuevo){ //valor == id de categoría 
        var i = this.hash_pos(nuevo.id) //índice del valor
        if(this.tabla[i].vacia()){
            this.ocupados++ //validar si hay o no un valor en ese índice. Si no hay, se suma uno al tamaño actual
        }
        this.tabla[i].agregar(nuevo);
        this.rehashing()
    }

    hash_pos(valor){
        return valor % this.size //fórmula + size cambia con el rehashing
        
    }

    rehashing(){
        var porcentaje = this.ocupados/this.size
        if(porcentaje > 0.75){
            var temp = this.tabla //guardar tabla original 
            var tempS = this.size //guardar tamaño original
            this.size = this.ocupados*5 //nuevo tamaño 
            this.tabla = [] //resetear tabla - inicializar 
            for(var i = 0; i < this.size; i++){ 
                this.tabla.push(new Lista()) //agregar sus listas 
            }
            for(var i = 0; i < tempS; i++){ //recorrer todas las posiciones de la anterior tabla
                if(!temp[i].vacia()){ //si no está vacía, reasignar los valores 
                    var tempN = temp[i].cabeza
                    while(tempN){ //agregar nodos cambiando su referencia al siguiente 
                        this.agregar(tempN.valor)
                        tempN = tempN.siguiente 
                    }
                }
            }

        }
    }

    mostrarCategorias(){
        var html = ""
        for(var i = 0; i < this.size; i++){
            if(!this.tabla[i].vacia()){
                html += this.tabla[i].showCategorias()
            }else{
                html += ""
            }
            
        }
        return html 
    }

    graficar(){
        var dot = 'digraph Matriz{\n rankdir=TB label = "Categorías" fontsize="20pt" bgcolor = white \n; '
        dot+=    'node[margin="0.3,0.3", fontname="IMPACT", shape = box, fillcolor = "#FFEDBB", style=filled, border = white]';
        dot += 'N0[label = <<TABLE border = "0" cellpadding = "5" bgcolor = "#FFEDBB">'
        for (var i = 0; i < this.size; i++){
            var tempC = this.tabla[i].cabeza
            dot += '<TR><TD border="1" bgcolor="white"> #' + i +'</TD>     \n'
            while(tempC){
                dot += '<TD border="1" bgcolor="white"> ' + tempC.valor.id + " → " + tempC.valor.company +'</TD>'
                tempC = tempC.siguiente
            }
            dot+='</TR>'
        }
        dot += '</TABLE>>];}'
        console.log(dot)
        d3.select("#graphRender").graphviz()
            .width(700)
            .height(300)
            .renderDot(dot)
    }


}