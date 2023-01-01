class Nodo{
    constructor(valor){
        this.valor = valor
        this.derecha = null
        this.izquierda = null 
    }
}

export default class ABB{
    constructor(){
        this.raiz = null
    }

    agregarNodo(valor){
        this.raiz = this.agregar(valor, this.raiz)
    }

    agregar(valor, nodo){
        if(nodo == null){
            return new Nodo(valor)
        }
        if(valor.dni < nodo.valor.dni){
            nodo.izquierda = this.agregar(valor, nodo.izquierda)
        }else{
            nodo.derecha = this.agregar(valor, nodo.derecha)
        }

        return nodo
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

        dot += "N" +nodo.valor.dni + '[ label = "' + nodoI + nodo.valor.dni +"\\n" + nodo.valor.nombre+ nodoD + '"];\n'
        if(nodo.izquierda){
            dot+="N"+ nodo.valor.dni + ":C0 ->N" + nodo.izquierda.valor.dni + "\n"
        }

        if(nodo.derecha){
            dot+= "N" + nodo.valor.dni + ":C1 ->N" + nodo.derecha.valor.dni + "\n"
        }

        return dot
    }


    newDiv(nodo){
        var html = ""
        html += '<div class="actor" style="display: inline-flex; justify-content: center; align-items: center; margin-top: 30px;">'
        html += '<div class= "actor_card" id="actor_card">'
        html += '<h3 id = "actor_name">'+ nodo.valor.nombre +'</h3>'
        html += '<img src="assets/images/actor.png" id="actor_picture">'
        html += '</div>'
        html += '<div class="actor_desc">' + nodo.valor.desc +'</div></div>'
        return html 
    }

    showDivsPostorden(nodo){
        var html = ""
        if (nodo==null){
            return ""
        }
        html += this.showDivsPostorden(nodo.izquierda)
        html += this.showDivsPostorden(nodo.derecha)
        html += this.newDiv(nodo)
        return html
    }
    
    showDivsPreorden(nodo){
        var html = ""
        if (nodo==null){
            return ""
        }
        html += this.newDiv(nodo)
        html += this.showDivsPreorden(nodo.izquierda)
        html += this.showDivsPreorden(nodo.derecha)
        return html
    }

    showDivsInorden(nodo){
        var html = ""
        if (nodo==null){
            return ""
        }
        html += this.showDivsInorden(nodo.izquierda)
        html += this.newDiv(nodo)
        html += this.showDivsInorden(nodo.derecha)
        return html
    }


}