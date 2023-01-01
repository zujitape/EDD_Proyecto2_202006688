import ListaSimple from './ListaSimple.js';

class Nodo{
    constructor(valor){
        this.comments = new ListaSimple()
        this.valor = valor
        this.izquierda = null
        this.derecha = null
        this.altura = 0
    }
}

export default class AVL{
    constructor(){
        this.raiz = null
    }

    //por id para gráfica admin
    agregarNodoID(valor){
        this.raiz = this.agregarID(valor, this.raiz)
    }

    agregarID(valor, nodo){
        if (nodo == null){
            return new Nodo(valor);
        }
        if(valor.id < nodo.valor.id){
            nodo.izquierda = this.agregarID(valor, nodo.izquierda)//inserción
            if(this.height(nodo.derecha)-this.height(nodo.izquierda) == -2){//restar alturas de derecho e izquierdo
                if (valor.id < nodo.izquierda.valor.id){//si es menor viene de la izquierda
                    nodo = this.rotarI(nodo)
                }else{//si es mayor viene de la derecha
                    nodo = this.rotarDobleI(nodo)
                }
            }
        }else if(valor.id > nodo.valor.id){
            nodo.derecha = this.agregarID(valor, nodo.derecha)
            if(this.height(nodo.derecha)-this.height(nodo.izquierda) == 2){//restar alturas de derecho e izquierdo
                if (valor.id > nodo.derecha.valor.id){//si es menor viene de la derecha
                    nodo = this.rotarD(nodo)
                }else{//si es mayor viene de la izquierda
                    nodo = this.rotarDobleD(nodo)
                }
            }
        }else{
            nodo.valor = valor 
        }
        nodo.altura = this.maxheight(this.height(nodo.izquierda), this.height(nodo.derecha))+1 //+1 por el nuevo nodo que se inserta
        return nodo
    }


    //por nombres para ordenamiento asc
    agregarNodoNombre(valor){
        this.raiz = this.agregarNombre(valor, this.raiz)
    }

    agregarNombre(valor, nodo){
        if (nodo == null){
            return new Nodo(valor);
        }else{
            if(valor.nombre < nodo.valor.nombre){
                nodo.izquierda = this.agregarNombre(valor, nodo.izquierda)//inserción
                if(this.height(nodo.derecha)-this.height(nodo.izquierda) == -2){//restar alturas de derecho e izquierdo
                    if (valor.nombre < nodo.izquierda.valor.nombre){//si es menor viene de la izquierda
                        
                        nodo = this.rotarI(nodo)
                    }else{//si es mayor viene de la derecha
                        nodo = this.rotarDobleI(nodo)
                    }
                }
            }else if(valor.nombre > nodo.valor.nombre){
                nodo.derecha = this.agregarNombre(valor, nodo.derecha)
                if(this.height(nodo.derecha)-this.height(nodo.izquierda) == 2){//restar alturas de derecho e izquierdo
                    if (valor.nombre > nodo.derecha.valor.nombre){//si es menor viene de la derecha
                        nodo = this.rotarD(nodo)
                    }else{//si es mayor viene de la izquierda
                        nodo = this.rotarDobleD(nodo)
                    }
                }
            }else{
                nodo.valor = valor 
            }
            nodo.altura = this.maxheight(this.height(nodo.izquierda), this.height(nodo.derecha))+1 //+1 por el nuevo nodo que se inserta
            return nodo
        }

    }

    rotarI(nodo){ //hacia dónde se rota - nodo-Z
        var auxiliar = nodo.izquierda //valor de Y
        nodo.izquierda = auxiliar.derecha //cambios de nodos hijos
        auxiliar.derecha = nodo //paso de Z a derecha de Y
        nodo.altura = this.maxheight(this.height(nodo.derecha), this.height(nodo.izquierda))+1
        auxiliar.altura = this.maxheight(this.height(nodo.izquierda), nodo.altura)+1;
        return auxiliar //Y es la nueva raiz por lo que se devuelve
    }

    rotarD(nodo){ //hacia dónde se rota - nodo-Z
        var auxiliar = nodo.derecha //valor de Y
        nodo.derecha = auxiliar.izquierda //cambios de nodos hijos
        auxiliar.izquierda = nodo //paso de Z a derecha de Y
        nodo.altura = this.maxheight(this.height(nodo.derecha), this.height(nodo.izquierda))+1
        auxiliar.altura = this.maxheight(this.height(nodo.izquierda), nodo.altura)+1;
        return auxiliar //Y es la nueva raiz por lo que se devuelve
    }

    rotarDobleI(nodo){
        nodo.izquierda = this.rotarD(nodo.izquierda)
        return this.rotarI(nodo)
    }

    rotarDobleD(nodo){
        nodo.derecha = this.rotarI(nodo.derecha)
        return this.rotarD(nodo)
    }

        //doble, no alturas pq se calcula en las simples
    height(nodo){
        if(nodo == null) return -1;
		return nodo.altura;
    }

    maxheight(v1, v2){
        if(v1>v2) return v1;
        return v2;
    }

    graficar(){
        var dot = 'digraph Matriz{\n rankdir=TB; node[margin="0.3,0.3", fontname="IMPACT", shape = record, fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT"\n subgraph cluster_p{';
        dot += 'label = "Actores" fontsize="20pt" bgcolor = white \n';
        dot += this.generarDot(this.raiz)
        dot += "}}}"
        console.log(dot)
        d3.select("#graphRender").graphviz()
            .width(700)
            .height(300)
            .renderDot(dot)

    }

    generarDot(nodo){
        if (nodo==null){
            return ""
        }

        var dot = ""

        dot += this.generarDot(nodo.izquierda)
        dot += this.generarDot(nodo.derecha)

        var nodoI = ""
        var nodoD = ""
        
        if (nodo.izquierda){
            nodoI+= "<C0>|"
        }

        if (nodo.derecha){
            nodoD += "|<C1>"
        }

        dot += "N" +nodo.valor.id + '[ label = "' + nodoI + nodo.valor.id + "\\n" + nodo.valor.nombre + nodoD + '"];\n'
        
        if(nodo.izquierda){
            dot += "N"+ nodo.valor.id + ":C0 ->N" + nodo.izquierda.valor.id+ "\n"
        }

        if(nodo.derecha){
            dot+= "N" + nodo.valor.id + ":C1 ->N" + nodo.derecha.valor.id + "\n"
        }

        return dot
    }

    mostrarPelicula(id){
        var temp = this.raiz;
        var html = ""
        while(temp){
            if(temp.valor.id == id){
                html += '<div class = "movie_info">'
                html += '    <h2 class = "title" id="'+id+'">'+ temp.valor.nombre +'</h2>'
                html += '    <h5>Puntuación</h5>'
                for (var i = 0; i < Math.round(temp.valor.punct); i++){
                    html += '    <label class = "fas fa-star" style = "color: #fd4"></label>'
                }
                html += '    <div class = "desc" style="display: inline-flex;">'
                html += '        <img src="assets/images/icon.png" style="width: 90px; height: 90px; margin-right: 2%;">'
                html += temp.valor.descripcion + '</div>'
                html += '    <button id="btn_rent_individual" style="display: flex; justify-content: center; align-items: center; font-weight: 800;"><img src="assets/images/shop.png" id="movie_opt" style="margin-right: 10px; margin-top: 10px; height: 90px; width: 90px;"><br>Alquilar<br>'+ temp.valor.precio +'</button>' 
                html += '</div> ' 
                html += '<div class = "movie_rate">'
                html += '    <h2>Califica esta película!</h2> '
                html += '    <div class="star-widget">'
                html += '        <input type="checkbox" name="rate" id="rate-5">'
                html += '        <label for="rate-5" class="fas fa-star"></label>'
                html += '        <input type="checkbox" name="rate" id="rate-4">'
                html += '        <label for="rate-4" class="fas fa-star"></label>'
                html += '        <input type="checkbox" name="rate" id="rate-3">'
                html += '        <label for="rate-3" class="fas fa-star"></label>'
                html += '        <input type="checkbox" name="rate" id="rate-2">'
                html += '        <label for="rate-2" class="fas fa-star"></label>'
                html += '        <input type="checkbox" name="rate" id="rate-1">'
                html += '        <label for="rate-1" class="fas fa-star"></label>'
                html += '    </div><button id = "send_q"><img id= "enviarimg" src="assets/images/send.png">Calificar</button>'
                html += '</div>'
                html += '<h2 style ="margin-top: 30px; font-weight: 600;">Comentarios</h2>'
                html += '<div class = "comment_section">'
                html += temp.comments.showComentarios()
                html += '</div>'
                html += '<input type="text" placeholder="Ingresa tu comentario" class ="comment_sth" id="comment"></div>'
                html += '<button class = "btn" id ="send_comment">Publicar</button>'
                return html 
            }else if(id < temp.valor.id){
                temp = temp.izquierda
            }else{
                temp = temp.derecha
            }
        }
    }

    existe(id){
        var temp = this.raiz;
        while(temp){
            if(temp.valor.id == id){
                return temp
            }else if(id < temp.valor.id){
                temp = temp.izquierda
            }else{
                temp = temp.derecha
            }
        }
    }



    newDiv(nodo){
        var html = ""
        html += '<div class="movie">'
        html += '<div class= "movie_card" id="movie_card">'
        html += '<h3 class = "movie_title">'+nodo.valor.nombre+'</h3>'
        html += '<img src="assets/images/movie2.png" id="movie_picture">' 
        html += '</div>'
        html += '<div class="movie_desc">' + nodo.valor.descripcion
        html += '</div>'
        html += '<div class="movie_opts">'
        html += '<button class="infobtns" style="display: block;justify-content: center; align-items: center;" id= "' + nodo.valor.id + '" ><img src="assets/images/info.png" class="movie_opt" id= "' + nodo.valor.id + '" ><br>Información</button>'
        html += '<button class= "rentbtns" style="display: block; justify-content: center; align-items: center;" id= "' + nodo.valor.id + '"><img src="assets/images/shop.png" class="movie_opt" id= "' + nodo.valor.id + '" ><br>Alquilar<br>Q'+ nodo.valor.precio +'</button>'      
        html += '</div>'
        html += '</div>'
        return html 
    }


    //ascendente - inorden
    showDivsAsc(nodo){
        var html = ""
        if (nodo==null){
            return ""
        }
        html += this.showDivsAsc(nodo.izquierda)
        html += this.newDiv(nodo)
        html += this.showDivsAsc(nodo.derecha)
        return html
    }

    showDivsDesc(nodo){
        var html = ""
        if (nodo==null){
            return ""
        }
        html = this.showDivsDesc(nodo.izquierda) + html
        html = this.newDiv(nodo) +html 
        html = this.showDivsDesc(nodo.derecha) +html 
        return html
    }




    


}