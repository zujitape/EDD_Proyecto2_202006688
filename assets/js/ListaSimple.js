class Nodo{
    constructor(valor){
        this.rentadas = new Lista()
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

    vacia(){
      return this.cabeza === null ; 
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
    
    dotCategorias(index){
        var dot = ""
        var temp = this.cabeza
        var conexiones ="";
        var nodos ="";
        var rank = "";
        var i = 0

        while(temp){
          nodos+= "N" + index + i + "[label = \"" + temp.valor.id +"\\n" + temp.valor.company + "\"];\n"
          rank+= " N" + index + i
            if(temp.siguiente != null){
              var auxi = i+1
              conexiones += "N" + index + auxi +" -> N" + index + i + ";\n"
              rank+= ", "
            }
          temp = temp.siguiente
          i++
        }

        dot+= nodos+"\n \n"+conexiones+"\n\n"
        
        dot+= "{rank = same;" + rank + "}\n"
        console.log(dot)
        return dot
    }

    showComentarios(){
      var temp = this.cabeza
      var html = ""
      if(this.size >0){
        while(temp){
          console.log(temp)
          html += '    <div class = "comment"><h4><font color=blue>'+temp.valor.user+':</font>&nbsp; &nbsp;  '+temp.valor.comentario+'</h4></div>'
          temp = temp.siguiente
        }
      }else{
          html += '<h2 style = "text-align: center">Parece que no hay nada por aquí <br><img src="assets/images/sad.png" style="width: 110px; height: 110px"></h2>'
      }
      return html 
    }

    showCategorias(){
      var temp = this.cabeza
      var html = ""
      if(this.size >0){
        while(temp){
          html += '<div class= "category_card" id="category_card" style="text-align: center;">'
          html += '<h3 id = "category_name">'+temp.valor.id+'</h3>'
          html += '<h5>' + temp.valor.company + '</h5>'
          html += '</div>'
          temp = temp.siguiente
        }
      }
      return html 
    }

}