//VARIABLES
const formulario = document.querySelector('#formulario');
const listaIdeas = document.querySelector('#lista-ideas');
let ideas = [];


//EVENTOS
eventListener();

function eventListener(){
    //Cuando el usuario agreaga una nueva idea.
    formulario.addEventListener('submit',agregarIdea);
    //Cuando el documento esta listo agrego las ideas guardadas del localStorage
    document.addEventListener('DOMContentLoaded',() => {
        ideas = JSON.parse( localStorage.getItem('ideas')) || []; //convierto el string obtenido y lo guardo en ideas, si no hay nada en el storage guardo un arreglo vacio.
        crearHTML();
    });
}


//FUNCIONES
function agregarIdea(e) {
    e.preventDefault();

    // guardo lo que escribe el usuario
    const idea = document.querySelector('#idea').value;

    //validaciones
    if(idea === "") {
        
        mostrarError('La idea no puede ir vacia');
        //con el return evito que se ejecuten mas lineas de codigo.
        //funciona si esta en una fucion.
        return;
    }
    // uso el Date.now() como identificadoe unico.
    const ideaObj = {
        id: Date.now(),
        idea  // si los nombres son iguales con uno ya es suficiente.
    }

    //tomo una copia de ideas y agreago la nueva idea.
    ideas = [...ideas, ideaObj]
    // una vez agreagado creo que HTML
    crearHTML();
    //reiniciar el formulario
    formulario.reset();

}

function mostrarError(mensaje) {
    //mensaje creado
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');
    //agrego el mensaje en el html
    formulario.appendChild(mensajeError);
    //lo elimino despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//mostrar el listado de las ideas
function crearHTML ()  {

    limpiarHTML();

    if(ideas.length > 0) {
        ideas.forEach( (idea) => {
            //agregar un btn eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-idea');
            btnEliminar.textContent = 'X'
            //añadir la funcion de eliminar idea
            btnEliminar.onclick = () => {
                borrarIdea(idea.id);
            }
            // crear el HTML
            const li = document.createElement('li')
            //añadir el texto de la idea
            li.textContent = idea.idea;
            //asignar el btn
            li.appendChild(btnEliminar);
            //incertarlo en el HTML
            listaIdeas.appendChild(li);
        });
    }

    sincronizarStorage();
}


//agregarega las ideas actuales a localStorage
function sincronizarStorage() {
    //convierto el arreglo a string y lo agrego en el localStorage
    localStorage.setItem('ideas', JSON.stringify(ideas));
    
}

function limpiarHTML() {
    //mientras haya elementos elimine el primer chid que vaya encontrando.
    while(listaIdeas.firstChild) {
        listaIdeas.removeChild(listaIdeas.firstChild);
    }
}


function borrarIdea(id) {
    //.filtrer() crea un nuevo arreglo
    //voy a guardarme todos las demas ideas menos a la que el usuario dio clik
    ideas = ideas.filter(idea => idea.id !== id);
    crearHTML();
}