/*

    LLEGENDA DE METODES

.querySelector()
    El método querySelector() de la intrefaz  Element devuelve el primer descendiente del elemento 
    sobre el cual es invocado que coincida con el o los selectores especificados.

.addEventListener()
    addEventListener() Registra un evento a un objeto en específico. El Objeto especifico puede ser 
    un simple elemento en un archivo, el mismo  documento , una ventana o un  XMLHttpRequest.

.preventDefault()
    Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir,
    puede ser llamado de nuevo.

.getAttribute() 
    devuelve el valor del atributo especificado en el elemento. Si el atributo especificado no existe, 
    el valor retornado puede ser tanto null como "".    










*/













// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    // cuando agregas un curso presionado "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarrito.addEventListener('click', () =>{
        articulosCarrito =[] // reiniciem el carrito
        limpiarHTML();
    })
}

// Funciones



// Agrega un curso
function agregarCurso(e) {
    e.preventDefault();
    if ( e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);

    }
}

// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        console.log(articulosCarrito);

        carritoHTML(); // iterem el carrito i mostrem el html
    }else{

    }
}


// lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    

    // Creem un objecte amb la informacio del curs
    const infoCurso = {
        imagen :    curso.querySelector('img').src,
        titulo :    curso.querySelector('h4').textContent,
        precio:     curso.querySelector('.precio span').textContent,
        id:         curso.querySelector('a').getAttribute('data-id'),
        cantidad:   1,
    }
    

    // revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

    if (existe){

        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso; // retorna los objetos que no son duplicados
            }
        } );
        articulosCarrito = [...cursos]
    }else{
        // Agregar elementos al array de carrito  'articulosCarrito =+1'
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();

}




// muestra el carrito de compras en el HTML
function carritoHTML(){

    // limpiar el HTML
    limpiarHTML();
    // recore el carrito y genera el HTML
    articulosCarrito.forEach( curso =>{
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
               <img src=${imagen} width="100" >      
            </td>
            <td>${titulo}</td>
            <td>${precio}<td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id=${id}>X</td>
        `;
            
        // Agregar el HTML en el tbody
        contenedorCarrito.appendChild(row);

    })
}


// Elimina los cursos del tbody
function limpiarHTML(){
    // de forma lenta
    // contenedorCarrito.innerHTML = '';  


    // metodo agil, mientras contenedorCarrito tenga hijos, eliminaremos al primer hijo
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}














