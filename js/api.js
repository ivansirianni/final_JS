//Clase constructoras para mis objetos del catalogo
class Farmacia{
    constructor(id, laboratorio, producto, precio,imagen){
        this.id = id,
        this.laboratorio = laboratorio,
        this.producto = producto,
        this.precio = precio,
        this.imagen = imagen
    }
    verDatos(){        
        console.log(`En nuestro sistema encontramos:\nID: ${this.id}\nLABORATORIO: ${this.laboratorio}\nPRODUCTO: ${this.producto}\nPRECIO DE COSTO: ${this.precio}\n IMAGEN:${this.imagen}`)
    }
}
let stock = []
const ver_destacados = async() =>{
    const response = await fetch("destacados.json")
    const data = await response.json()
    console.log(data)
    for (let item of data){        
        let productoNuevo = new Farmacia(item.id, item.laboratorio, item.producto, item.precio, item.imagen)
        stock.push(productoNuevo)
    }   
    localStorage.setItem("stock", JSON.stringify(stock))    
}

let carrito_compra = JSON.parse(localStorage.getItem("carrito")) || [] //OPERADOR OR
if(localStorage.getItem("stock")){
    stock = JSON.parse(localStorage.getItem("stock"))
}
else{  
    ver_destacados()
}