//carrito
     
const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h2 class"modal-header-title">carrito.</h2>
    `;
    modalContainer.append(modalHeader);
    
    const modalButton = document.createElement("h2");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);


    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="delete-product"> ❌ </span>
        `;
        modalContainer.append(carritoContent);
        
        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if(product.cantidad !== 1) {
                product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

       let sumar = carritoContent.querySelector(".sumar");
       sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        pintarCarrito();
       });
            


        

        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });

        
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡El producto se eliminará del carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
    }
  });
};


const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();


let nombre = "";
let direccion = "";

    document.querySelector("#formu").addEventListener("submit", function(event) {
        event.preventDefault();

  
        nombre = document.querySelector("#nombre").value;
        direccion = document.querySelector("#direccion").value;

  
    
        const info = document.getElementById("informacion");
        info.innerHTML = `<p>${nombre} hemos recibido su pedido correctamente y será enviado a ${direccion} en 5 días hábiles. Gracias por su compra!</p>`;
  
    
    
    carrito = [];
    carritoCounter();
    saveLocal();
   
    

});

    
    

    














   