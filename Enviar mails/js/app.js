/* Apunts




SEGURITZAR EL FORMULARI CONTRA CODI MALICIOS O CORREUS FALÇOS

const er            =>  es sol reservar un codic que permet filtrar posibles correus falços. mes informacio: https://emailregex.com/
.test()             =>  El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
                        En este cas l'utilitzem per comparar els valors introduits al camp del formulari.



/////////////////

METODES:


.addEventListener(evento, lanzarFuncion)    Registra un evento a un objeto en específico. El Objeto especifico puede ser un simple elemento en un archivo, 
                                            el mismo  documento , una ventana o un  XMLHttpRequest.

Document.querySelector('h1')                Devuelve el primer elemento del documento (utilizando un recorrido primero en profundidad pre ordenado de los nodos del documento) 
                                            que coincida con el grupo especificado de selectores.

Nodo appendChild                            Agrega un nuevo nodo al final de la lista de un elemento hijo de un elemento padre especificado.
                                            Si el hijo(Child) es una referencia(hace referencia) hacia un nodo existente en el documento actual, este es quitado del padre 
                                            actual para ser puesto en el nodo padre nuevo. La clave está en si el (Child) es una referencia a un nodo existente en el documento.



///////////////

EVENTS:

'blur'              =>  El evento blur es disparado cuando un elemento ha perdido su foco. "click dentro de X zona = dentro del foco, 
                        click fuera a otro elemento de html = fuera del foco"

Event.target        =>  La propiedad target de la interfaz del event.currentTarget es una referencia al objeto en el cual se lanzo el evento.





Afegir o eliminar propietats d'estil al objecte creat per un event.

                    =>  e.target.classList   //classList almacena el listado de classes css que tiene el objeto
                    =>  e.target.classList.add('propietat CSS 1','propietat CSS 2', ...);
                    =>  e.target.classList.remove('propietat CSS 1','propietat CSS 2', ...);



*/



// variables
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');

// Variables campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//https://emailregex.com/ Per a validar mails
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 




/*
     funcions
*/


//iniciem la primera funcio
// eventListeners iniciara una escolta a diferents elements del formulari per a saber cuan interactuem per ella
eventListeners();
function eventListeners() {
    // cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario); 

    // enviar email
    formulario.addEventListener('submit', enviarEmail);

     // Boton de reset
     resetBtn.addEventListener('click', resetFormulario);
}



// funciones
function iniciarApp(){
    // desavilitar envio
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}




// Validar formulario
// Esta funcio es el core i es
function validarFormulario(e){

    if(e.target.value.length > 0 ){ //e almacena la informacion del evento que ha iniciado la funcion, target es una referencia al objeto en el cual se lanzo el evento

        // Eliminem els errors
        const error = document.querySelector('p.error'); // Seleccionamos el primer elemento <p> con classe error
        if(error){
            error.remove();
        }
        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
    }else{
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){

        if( er.test( e.target.value ) ){
            const error = document.querySelector('p.error');
            //Eliminem errors
            if(error){
               error.remove(); 
            }
              
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('El email no es valido');
        }
    }

    if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

// En caso de errores en el formulario
function mostrarError(mensaje){
    const mensajeError = document.createElement ('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'bacground-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error'); // Classes de TailwinCSS

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0 ){
        formulario.appendChild(mensajeError);
    } 
}

// Enviar email
function enviarEmail(e){
    e.preventDefault();

    // mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    // despues de 3 segundos ocultar el spinner y mostrar el mensaje

    // TIMMER 3 segons
    setTimeout(() => {
        spinner.style.display = 'none';

        //mensaje confirmacion, correo enviado
 
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente'; 
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase');
        
        // Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
           parrafo.remove();//Eliminamos el texto 
           resetFormulario();
        }, 5000);
    }, 3000);
}


// Funcion reseteo de formulario

function resetFormulario(){
    formulario.reset();
    iniciarApp();
}