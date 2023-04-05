// agregar los datos que necesito de HTML

// Contenedor de productos
const productos = document.querySelector(".product-container");

//Contenedor de categorias 
const categorias = document.querySelector(".categories");

//Colleccion de botones de todas las categorías
const listacategorias = document.querySelectorAll(".category");

// Boton para abrir y cerra menu
const btnham = document.querySelector(".menu-hambur");

//  Menú (Hamburguesa)
const barraMenu = document.querySelector(".navbar-list");

// Botón para abrir y cerrar carrito
const btnCarrito = document.querySelector(".cart-label");

// Carrito
const carritoMenu = document.querySelector(".cart");

// Contenedor de productos del carrito
const productosCarrito = document.querySelector(".cart-container");
//El total en precio del carrito
const total = document.querySelector(".total-p");

// el btn de comprar productos
const btnComprar = document.querySelector(".buy");
// el btn de vaciar carrito
const btnVaciar = document.querySelector(".delete");

//  Modal de agregado al carrito.
const mjeModalExito = document.querySelector(".add-modal");
//burbuja carrito
const burbujaCarrito = document.querySelector(".cart-bubble");



let carrito = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (carritoActual) => {
	localStorage.setItem("cart", JSON.stringify(carritoActual));
};



// metodos

const renderizarProducto =(producto) =>{

    const { id, nombre, precio, cardImg } = producto;

    return `<div class="product">
    <img
      src= ${cardImg} 
      alt="Img de carrito" 
      class="img-prod" />
    <h3>${nombre}</h3>
    <div class="info-prod">
      <span>$${precio}</span>
      <button class="info-btn"
       data-id="${id}"
       data-nombre="${nombre}"
       data-precio="${precio}"
       data-img="${cardImg}"> Agregar</button>
    </div>
  </div> `
};

const renderizarTodosProductos =() => {

    productos.innerHTML= datosProductos.map(renderizarProducto).join("");
};

const renderizarProductosFiltrados = (categoria) =>{

    const productosFiltrados =datosProductos.filter((producto) => {
        return producto.categoria === categoria });
    
    productos.innerHTML = productosFiltrados.map(renderizarProducto).join("");
};


const renderizarProductos = (categoria = undefined) => {
	if (!categoria) {
		// renderDividedProducts(index);
        // mostrar todos los productos
    renderizarTodosProductos();
		return;
	}
	renderizarProductosFiltrados(categoria);
}


// boton ver mas ,analizar si se agrega o no


const cambiarBtEstadoActivo=(catSel)=>{
  const categorias = [...listacategorias];

  categorias.forEach(( catBtn )=> {
    if (catBtn.dataset.category !== catSel ){
      catBtn.classList.remove("active");
      return;
    }
    catBtn.classList.add("active");
  });
  // catBtn.classList.add("active");
};

const cambiarEstadoFiltro=(e)=>{
  const categoriaSeleccionada = e.target.dataset.category;

cambiarBtEstadoActivo(categoriaSeleccionada);
};


const aplicarfiltros=(e)=>{
  if (!e.target.classList.contains("category")) {
		return;
	} else {
		cambiarEstadoFiltro(e);
	}
  if( !e.target.dataset.category){
    productos.innerHTML="";
    renderizarProductos();
  }else{
    renderizarProductos(e.target.dataset.category);
  }

};

const clikearMenu =()=>{
  barraMenu.classList.toggle("open-menu");
  if (carritoMenu.classList.contains("open-cart")) {
		carritoMenu.classList.remove("open-cart");
		return;
	}
  
};


// ver que hacer cuando estan abierto carrito y menu 


// carrito

const obtenerImgProducto =(id)=>{

  const prodFiltrado = datosProductos.filter((p)=>{
    return p.id === id ;
  });
  return prodFiltrado.cardImg;
};

const renderizarProductoEnCarrito =(productoEnCarrito)=>{

  const { id, nombre, precio, cardImg, cantidad } = productoEnCarrito;

  // const img = obtenerImgProducto(productoEnCarrito.id);

  return `
  <div class="cart-item">
    <img src=${cardImg} alt="img de carrito" />
    <div class="item-info">
      <h3 class="item-title">${nombre}</h3>
      <span class="item-price">$ ${precio}</span>
    </div>
    <div class="item-handler">
      <span class="btn-handler down" data-id="${id}"> - </span>
      <span class="item-quantity"> ${cantidad} </span>
      <span class="btn-handler up" data-id="${id}"> + </span>
    </div>
  </div> `
};


const renderizarCarrito = () =>{
  if(!carrito.length){
    productosCarrito.innerHTML = `<p class"mje-vacio"> No hay productos en el carrito </p>`;
    return;
  }
  productosCarrito.innerHTML = carrito.map(renderizarProductoEnCarrito).join("");
};



const clikearCarrito =()=>{
  carritoMenu.classList.toggle("open-cart");
  if (barraMenu.classList.contains("open-menu")) {
		barraMenu.classList.remove("open-menu");
		return;
	}
};


const totalCarrito = () =>{
  return carrito.reduce((acumulado,actual)=>{
    return acumulado + Number(actual.precio) * actual.cantidad ;
  },0);
};

const mostrarTotal = () =>{
  total.innerHTML = `${totalCarrito().toFixed(2)}`;
};

const renderizarCantidadBurbuja=()=>{
  burbujaCarrito.textContent= carrito.reduce((acumulado,actual)=>{
    return acumulado + actual.cantidad;
  },0);

};

const renderizarBurbuja=()=>{

  if(Number(burbujaCarrito.textContent) != 0){
     burbujaCarrito.classList.add("enable-bubble");
  }else{
    burbujaCarrito.classList.remove("enable-bubble");
  }

};


const cerrarOnScroll=()=>{

  if(!carritoMenu.classList.contains("open-cart")){
    return;
  }else{
    carritoMenu.classList.remove("open-cart");
  }
};


const actualizarEstadocarrito=()=>{
  saveLocalStorage(carrito);
  renderizarCarrito(); 
  mostrarTotal();
  deshabilitarBtn(btnComprar); 
  deshabilitarBtn(btnVaciar);
  renderizarCantidadBurbuja();
  renderizarBurbuja();

};


const datosProd = (id,nombre,precio,cardImg)=>{
  
  return { id, nombre, precio, cardImg };

};

const agregarUnidProducto=(prod)=>{

  carrito=carrito.map((prodCar)=>{
    return prodCar.id === prod.id ? {...prodCar,cantidad: prodCar.cantidad+1} : prodCar;
  });
};

const disminuirUnidProducto=(prod)=>{

  carrito=carrito.map((prodCar)=>{
    return prodCar.id === prod.id ? {...prodCar,cantidad: prodCar.cantidad-1} : prodCar;
  });
};

const existeProdCarrito=(prod)=>{
  return carrito.find((prodCar)=>{
    return prodCar.id===prod.id;
  });

};



const agregarProductoEnCarrito = (e) =>{

  if(!e.target.classList.contains("info-btn")){
    return;
  }

  const {id, nombre, precio, img} = e.target.dataset;

  const prod = datosProd(id, nombre, precio, img);

  

  if(existeProdCarrito(prod)){
    agregarUnidProducto(prod);
    // modalde exito
    mostrarMjeExito("Se agregó una unidad del producto al carrito");
  }else{
    agregarProdCarrito(prod);
    // modal de exito
    mostrarMjeExito("Se agregó una unidad del producto al carrito");
  }

  actualizarEstadocarrito();

};



// ver de agregar modal de exito

const mostrarMjeExito=(mje)=>{
  mjeModalExito.classList.add("active-modal");
	mjeModalExito.textContent = mje;
	setTimeout(() => {
		mjeModalExito.classList.remove("active-modal");
	}, 1500);
};


const agregarProdCarrito=(prod)=>{

  // console.log(prod);

  carrito =[...carrito,
    {...prod,
    cantidad:1,
    },
  ];
};

const vaciarCarrito=()=>{
  carrito =[];
  actualizarEstadocarrito();
};

const deshabilitarBtn = (btn) => {
	if (!carrito.length) {
		btn.classList.add("disabled");
	} else {
		btn.classList.remove("disabled");
	}
};

const removerProductoDecarrito=(productoExistente)=>{
  carrito = carrito.filter((producto)=>{
    return producto.id !== productoExistente.id;
   });
  actualizarEstadocarrito();
};

const aumentarDisminuirBtn =(id,accion)=>{
  const productoCarritoExistente = carrito.find((p)=>{
    return p.id===id;
  });

  if(accion === "down"){
    if(productoCarritoExistente.cantidad===1){
      // remover producto
      removerProductoDecarrito(productoCarritoExistente);
      // window.alert("Se elimino producto del carrito");
      mostrarMjeExito("Se elimino producto del carrito");
      return;
    }else{
      // sustraer unidad en producto
      disminuirUnidProducto(productoCarritoExistente);
    }
  } else if (accion ==="up"){
    // Aumentar unidad
    agregarUnidProducto(productoCarritoExistente);
    // window.alert("Se aumento unidad de producto en carrito");
  }
};


const actualizarCantidadEnCarrito=(e)=>{
  if(e.target.classList.contains("down")){
    //  disminuir cantidad
    aumentarDisminuirBtn(e.target.dataset.id,"down");
  }else if(e.target.classList.contains("up")){
    // aumenta cantidad
    aumentarDisminuirBtn(e.target.dataset.id,"up");
  }
  actualizarEstadocarrito();
};


const completarCompra=()=>{
  if(!carrito.length) return;
  else if(window.confirm("¿Desea completar su compra?")){
    vaciarCarrito();
    // alert("Gracias por su compra!")
    mostrarMjeExito("Gracias por su compra!");
  }
};



const init=()=>{
  renderizarProductos();
  actualizarEstadocarrito();
  categorias.addEventListener("click", aplicarfiltros);
  btnham.addEventListener("click", clikearMenu);
  btnCarrito.addEventListener("click", clikearCarrito);
  document.addEventListener("DOMContentLoaded",renderizarCarrito);
  document.addEventListener("DOMContentLoaded",mostrarTotal);
  productos.addEventListener("click", agregarProductoEnCarrito);
  productosCarrito.addEventListener("click",actualizarCantidadEnCarrito);
  btnComprar.addEventListener("click",completarCompra);
  btnVaciar.addEventListener("click",vaciarCarrito);
  window.addEventListener("scroll",cerrarOnScroll);
};

init();

