//variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets =[];


//event Listeners
eventListener();

function eventListener(){
    // cuando el usuario agrega un nuevo twwet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        console.log(tweets);
        crearHTML();

    });
}




//funciones

function agregarTweet(e){
    e.preventDefault();
    // text area
    const tweet = document.querySelector('#tweet').value;

    // validacion
    if(tweet === ''){
        mostrarError('Error, el mensaje no puede estar vacio')
        return; // sortim de la funcio
    }


    const tweetObj = {
        id: Date.now(),
        tweet, // Les versions mes actuals de javascript permet que una clau que tinue de nom el mateix valor es represente aixi.
    }

    // Afegir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Agregar el html
    crearHTML();

    //reiniciar formulario
    formulario.reset();
}


function mostrarError(error){    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertando el mensaje al contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() =>{
        mensajeError.remove();
    }, 3000);
}

// Mostrar llistat tweets

function crearHTML(){

limpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach( tweet => {
            // agregar boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id)
            }


            //crear html;
            const li = document.createElement('li');

            //añadir texto;
            li.innerText = tweet.tweet;

            // añadir boton;
            li.appendChild(btnEliminar);

            // insertarlo al html
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}


// sincronizar los mensajes a local storage

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Borrar tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id );
    crearHTML();
}



// Limpiar el HTML

function limpiarHTML(){
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}




   
