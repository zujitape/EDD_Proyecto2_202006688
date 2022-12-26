class Nodo{
    constructor(valor){
        this.valor = valor
        this.siguiente = null
    }
}

export default class Lista{
    constructor(){
        this.cabeza = null
        this.size = 0
    }

    agregar(valor){
        var temp = new Nodo(valor)
        temp.siguiente = this.cabeza 
        this.cabeza = temp 
        this.size++
    }

    //users
    existe(username, password){
        var temp = this.cabeza
        var found
        while(temp){
            if(temp.valor.username == username && temp.valor.pass == password ){
              found = temp
              break
            }else{
              temp = temp.siguiente 
            } 
        }
        return found
    }
    

    generarDot(){
        var dot = 'digraph Matriz{\n node[margin="0.3,0.3", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT"\n subgraph cluster_p{';
        dot += 'label = "Usuarios" fontsize="20pt" bgcolor = white \n';
  
        var temp = this.cabeza
        var conexiones ="";
        var nodos ="";
        var rank = "";
        var i= 0;
  
        while(temp){
          nodos+= "N" + i + "[label = \"" + temp.valor.username + "\"];\n"
          rank+= "N" + i
          if(temp.siguiente != null){
            var auxi = i+1
            conexiones += "N" + auxi +" -> N" + i + ";\n"
            rank+= ", "
          }
  
          temp = temp.siguiente
          i++
        }
  
        dot+= nodos+"\n \n"+conexiones+"\n\n"
        
        dot+= "{rank = same;" + rank + "}\n}\n}"
        console.log(dot)
        d3.select("#graphRender").graphviz()
            .width(700)
            .height(300)
            .renderDot(dot)
        
      }


}