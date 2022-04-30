
/*  APUNTS


Estrucatura script

Variables
Events
Funcions
Filtros


    El programa inicia al cargar el DOM, entrant a mostrar autos, generant els valors del selector dels anys i iniciant la lectura dels filtres
    El usuari al entrar a la web es trobara tota la informacio disponible i podra filtrarla amb els selectors

    La cosa va aixi: 
       1 - Iniciem les variables necesaries
       2 - activem els events
       3 - Entrem al programa presentant la primera lectura
       4 - cualsevol interaccio amb cualsevol selector desencadenara una resposta directa actualitzant la pantalla.
       5 - Avans de actualitzar la informacio de la pantalla es neteja el resultat anterior

    

METODES

.filter()                               -> crea un nuevo array con todos los elementos que cumplan la condicion implementada por la funcion dada.
.parseInt()                             -> pasa un string a int

.removeChild(resultado.firstChild)      -> Elimina el primer hijo del elemento html con ID resultado.
.appendChild(autoHTML);                 -> Añade el nuevo valor al hijo del elemento html

document.createElement('div');          -> Crea un nuevo elemento a document de tipo <div>





*/






// VARIABLES ID SELECTORES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


// CONSTANTES Contenedor para los resultados
const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max - 10;


// Generar objeto con la busqueda
const datosBusqueda ={
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}
// EVENTOS
document.addEventListener('DOMContentLoaded', () =>{

    mostrarAutos(autos);
    llenarSelect();
})


// Escoltem event de canvi als nostres selectors
// modifiquem el objecte datos de Busqueda
// enviem a filtrar el objecte datos de busqueda

marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});    

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value); // convertim el valor de string a numero
    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});
   
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});


// FUNCIONES



// Iniciem la funcio per mostrar els resultats
// llimpiem el HTML previ que teniem a la memoria
// iniciem un bucle per llegir les dades del objecte entrant
    //Aguardem els valors de les claus del objecte en variables
    //Creem un element html tipo <p>
    // Donem forma al parraf i afegim els valors extrets del objecte entrant
    // Modifica el contingut del nou element html
    // Imprimim el resultat a la web

function mostrarAutos(autos){
    limpiarHTML();
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - transmisión: ${transmision} - precio: ${precio} - color: ${color}
        `;


        // insertar en el html
        resultado.appendChild(autoHTML);

    });
}

// limpiar HTML
    // iniciem un bucle que netejara el resultat avans de tornarlo a imprimir
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

// Selector anys
// Esta funcio nomes s'executa un cop al inici al cargar el DOM i formata el selector anys
function llenarSelect(){
    for(let i = max; i > min; i--){
        const opcion = document.createElement('option');
            opcion.value = i;
            opcion.textContent = i;
            year.appendChild(opcion)    // agrega las opciones del año al select
    }
}

// filtramos en base la busqueda
// Enviem cada clau a filtrar de les dades de busqueda,
// si resultado tiene informacion devolvemos a mostrar autos, sino mostramos un mensaje..
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarModelo).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
    if( resultado.length ){
     mostrarAutos(resultado);
    }else{
        noResultado();
    } 
}

// Sin resultados
// Limpiamos el html
// Creamos un elemento html <div>
// añadimos clases CSS al elemento creado
// añadirmos un texto
// Imprimimos el elemento a la pagina web
function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'Vaya, no hay resultados que mostrar, prueba otra busqueda';
    resultado.appendChild(noResultado);
}


// filtros
// guardamos el valor a filtrar de los datos de busqueda
// Devolvemos los valores de los selectores que coincidan con las claves del objeto de busqueda
function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}
function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === year;
    }
    return auto;
}
function filtrarModelo(auto){
    const {modelo} = datosBusqueda;
    if(modelo){
        return auto.modelo === modelo;
    }
    return auto;
}
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}
function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}




