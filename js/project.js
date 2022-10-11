//OBJETO SUCURSALES - clase constructora
class Sucursales{
    constructor(direccion, zona, telefono, imagen){        
        this.direccion = direccion,
        this.zona = zona,
        this.telefono = telefono
        this.imagen = imagen
    }//metodo
   
}

//SUCURSALES
const sucursal1 = new Sucursales("Bajada Puccio 1552", "NORTE", 4251236, "sucursal.jpg")

const sucursal2 = new Sucursales("Arijon 155 Bis", "SUR", 4125842, "sucursal.jpg")

const sucursal3 = new Sucursales("Entre Ríos 729", "CENTRO", 4568523, "sucursal.jpg")

const sucursal4 = new Sucursales("Pellegrini 6523", "OESTE", 4362145, "sucursal.jpg")

const sucursal5 = new Sucursales("Bv. Seguí 6411", "SUDOESTE", 4302562, "sucursal.jpg")

//ARRAY CON SUCURSALES
const locales = [sucursal1, sucursal2, sucursal3, sucursal4, sucursal5]



//VARIABLES
let btn_carrito = document.getElementById("boton_carrito")//BOTON DEL CARRITO

let modalBody = document.getElementById("modal-body")// MODAL DE LA CARD

let finalizar_compra = document.getElementById("btn_compra")//BOTON PARA FINALIZAR LA COMPRA DEL CARRITO

let total_compra = document.getElementById("total") //PARA EL PRECIO TOTAL

let productos_destacados = document.getElementById("productos_destacados") // DIV DONDE SE VA A CARGAR EL CATALOGO

let btn_ocultar_destacados = document.getElementById("ocultar_catalogo")//BOTON PARA OCULTAR CATALOGO

let btn_mostrar_catalogo = document.getElementById("ver_catalogo")//BOTON PARA MOSTRAR CATALOGO

let btn_vaciar = document.getElementById("btn_vaciar") // BOTON PARA VACIAR EL CARRITO

let mis_sucursales = document.getElementById("sucursales") //SUCURSALES

let btn_sucursal = document.getElementById("ver_sucu") //BOTON VER SUCURSAL

let btn_ocultar_sucu = document.getElementById("ocultar_sucu") //BOTON OCULTAR SOCURSAL



//FUNCIONES
//--------------- MOSTRAR CATALOGO
function funcion_mostrar_destacados(array){
    
  productos_destacados.innerHTML = ""
  array.forEach((item)=>{
      let nuevo_destacado = document.createElement("div")
      nuevo_destacado.innerHTML = `<div id="${item.id}" class="card" style="width: 18rem;">
                                  <img class="card-img-top" style="height: 250px;" src="sources/${item.imagen}" alt="${item.producto} de Laboratorio ${item.laboratorio}">
                                  <div class="card-body">
                                      <h4 class="card-title">${item.producto}</h4>
                                      <p>Laboratorio: ${item.laboratorio}</p>
                                      <p class="${item.precio <= 500 ? "ofertaColor" : "precioComun"}">Precio: ${item.precio}</p>
                                      <button id="agregar_carrito${item.id}" class="btn btn-outline-primary">Agregar al carrito</button>
                                  </div>
      </div>`
      productos_destacados.append(nuevo_destacado)

      let btn_agregar_carrito = document.getElementById(`agregar_carrito${item.id}`)
      console.log(btn_agregar_carrito)
      btn_agregar_carrito.addEventListener("click", ()=>{          
         funcion_carrito(item)
          
      })
  })
}
//--------------- OCULTAR CATALOGO
function funcion_esconder_destacados(){
  productos_destacados.innerHTML = ""
}

//--------------- AGREGAR AL CARRITO
function funcion_carrito(item){
  let agregados = carrito_compra.find((e)=> (e.id == item.id))    
  if(agregados == undefined){        
    carrito_compra.push(item)
    localStorage.setItem("carrito", JSON.stringify(carrito_compra))    
     
    Toastify({
      text: `${item.producto} se ha agregado al carrito`,
      offset: {
         x: 50, 
        y: 10 
      },
    }).showToast();

  }else{     
      console.log(`El producto ${item.producto} de Laboratorios ${item.laboratorio} ya se encuentra en el carrito`)
      Toastify({
        text: `${item.producto} Ya se encuentra en el carrito`,
        offset: {
          x: 50,
          y: 10 
        },
      }).showToast();
  }
  
}

//--------------- CARGAR EL CARRITO
function funcion_carga_carrito(array){
    
  modalBody.innerHTML = ""
  
  array.forEach((producto_carrito)=>{
     
      modalBody.innerHTML += `
      <div class="card border-primary mb-3" id ="producto_carrito${producto_carrito.id}" style="max-width: 540px;">
          <img class="card-img-top" height="300px" src="sources/${producto_carrito.imagen}" alt="${producto_carrito.producto}">
          <div class="card-body">
                  <h4 class="card-title">${producto_carrito.producto}</h4>
              
                  <p class="card-text">$${producto_carrito.precio}</p> 
                  <button class= "btn btn-danger" id="btn_eliminar${producto_carrito.id}"><i class="fas fa-trash-alt"></i></button>
          </div>    
      
      
      </div>`

})
array.forEach((producto_carrito, index)=>{
  document.getElementById(`btn_eliminar${producto_carrito.id}`).addEventListener("click",()=>{
    Toastify({
      text: `${producto_carrito.producto} ha sido eliminado`,
      offset: {
        x: 50, 
        y: 10 
      },
    }).showToast();           
            
      array.splice(index, 1)
      console.log(array)      
      localStorage.setItem("carrito", JSON.stringify(array))      
      let producto_removido = document.getElementById(`producto_carrito${producto_carrito.id}`)      
      producto_removido.remove()      
      funcion_contador(array)
      

  })
  
}) 
    
funcion_contador(array)    
}
//--------------- COMPRA TOTAL
function funcion_contador(array){
  let contador= 0
  
  contador = array.reduce((contador, producto_carrito)=>{
      return contador + producto_carrito.precio
  },0)
  
  contador == 0 ? total_compra.innerHTML = `
  <iframe id="gif_carrito" src="https://media.tenor.com/8BeuRyZSb90AAAAj/shopping-cart-shopping.gif" width="480" height="292" frameBorder="0" class="giphy-embed"></iframe>
  <p id="textoCarrito">No hay productos en el carrito</p>` : total_compra.innerHTML = `Hasta el momento. el total de su compra es: $${contador}
  `
}

//--------------- FINALIZAR COMPRA
function funcion_finalizar_compra(){
  //PReguntar si ta seguro
  Swal.fire({
      title: 'Desea finalizar su compra?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
  }).then((result)=>{
      if(result.isConfirmed){
          localStorage.clear()
          Swal.fire({
          title: 'Su compra se ha realizado con exito',
          icon: 'success',
          confirmButtonColor: 'green',
          text: `Muchas gracias, los productos han sido adquiridos `,
          })
          carrito_compra =[]
          funcion_carga_carrito(carrito_compra).remove()
          localStorage.removeItem("carrito")
          
      }else{          
          Swal.fire({
              title: 'No se ha realizado su compra',
              icon: 'info',
              text: `Los productos siguen en el carrito`,
              confirmButtonColor: 'green',
              timer:3500
          })
      }
  })
}

function vaciarCarrito(){
  Swal.fire({
    title: 'Desea vaciar el carrito?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    confirmButtonColor: 'green',
    cancelButtonColor: 'red',
}).then((result)=>{
    if(result.isConfirmed){
        localStorage.clear()
        Swal.fire({
        title: 'Su carrito ahora se encuentra vacio',
        icon: 'success',
        confirmButtonColor: 'green',
        text: `Se han eliminado todos los productos `,
        })
        carrito_compra =[]
        funcion_carga_carrito(carrito_compra).remove()
        localStorage.removeItem("carrito")
        
    }else{          
        Swal.fire({
            title: 'No se ha realizado la accion',
            icon: 'info',
            text: `Los productos siguen en el carrito`,
            confirmButtonColor: 'green',
            timer:3500
        })
    }
})
}


//--------------- MOSTRAR LAS SUCURSALES
function mostrarSucursales(array){ 
    mis_sucursales.innerHTML = ""
    array.forEach((locales)=>{
        let sucursales_card = document.createElement("div")
        sucursales_card.innerHTML = `<div class="card d-flex justify-content-start" style="width: 18rem;">
                                    <img class="card-img-top" style="height: 250px;" src="sources/${locales.imagen}" alt="${locales.zona} de Zona: ${locales.zona}">
                                    <div class="card-body">
                                        <h4 class="card-title">${locales.zona}</h4>
                                        <p>Dirección: ${locales.direccion}</p>
                                        <p class="">Teléfono: ${locales.telefono}</p>
                                        <button class="btn btn-outline-primary btn_ubi">Ver Ubicación</button>
                                    </div>
        </div>`
        mis_sucursales.append(sucursales_card)
    })
    let btn_ubi = document.getElementsByClassName("btn_ubi")
    for(let compra of btn_ubi){
    compra.addEventListener("click", ()=>{
        Swal.fire({
          title: 'Ubicación',
          text: 'Acceda a Google Maps y vea la forma mas rapida de llegar',
          imageUrl: 'https://i.blogs.es/635f55/maps/450_1000.webp',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
    })
}
}

//---------------- PARA ESCONDER SUCURSAL
function ocultarSucu(){
    mis_sucursales.innerHTML = ""
}

//BOTONES Y EVENT LISTENERS
//-------------- BOTON PARA MOSTRAR CATALOGO
btn_mostrar_catalogo.addEventListener("click", ()=>{
  let divLoader = document.getElementById("loader")
  divLoader.innerHTML = `<H5 id="h5_loader">Cargando catalogo, aguarde un momento por favor</H5>
  <iframe id="gif_loader" src="https://media.tenor.com/6gHLhmwO87sAAAAj/gg.gif" width="480" height="292" frameBorder="0" class="giphy-embed"></iframe>
  `
  setTimeout(()=>{
      divLoader.remove()
      funcion_mostrar_destacados(stock)

  },5000)
  
})

//--------------- BOTON FINALIZAR COMPRA
finalizar_compra.addEventListener("click", ()=>{funcion_finalizar_compra()})

//--------------- BOTON OCULTAR CATALOGO
btn_ocultar_destacados.onclick = funcion_esconder_destacados

//--------------- BOTON CARRITO
btn_carrito.addEventListener("click", ()=>{
    funcion_carga_carrito(carrito_compra)
})
//--------------- BOTON PARA MOSTRAR SUCURSALES

btn_sucursal.addEventListener("click", ()=>{
    mostrarSucursales(locales)
})

//--------------- BOTON PARA OCULTAR SUCURSALES

btn_ocultar_sucu.onclick = ocultarSucu

//-------------- BOTON PARA VACIAR EL CARRITO
btn_vaciar.addEventListener("click", () =>{
  vaciarCarrito()       
     
})


    




















