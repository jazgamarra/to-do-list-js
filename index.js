/**
 * jazgamarra @ 5/12/2022
 */
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let LIST;
let id;

/* Sincronizacion de la fecha del navegador. */
const FECHA = new Date ();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'long', day:'numeric'});

/* Agregar Tarea: Genera el elemento HTML a introducir a en el html.  */
function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} 

    const REALIZADO = realizado ? check : uncheck; 
    const LINE = realizado ? lineThrough : ''; 
    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `;
    lista.insertAdjacentHTML("beforeend",elemento);
}


/* Tarea Realizada: Hace el efecto visual de cambiar las clases cuando la tarea esta completada */
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = (LIST[element.id].realizado) ? false : true;
}

/* Tarea Eliminada: elimina el elemento de html y de la lista.   */
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
}

/* EventListener en el elemento 'boton' para agregar la tarea cuando se presione */
botonEnter.addEventListener('click', ()=> {
    const tarea = input.value;
    if(tarea){
        agregarTarea(tarea,id,false,false);
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        id++;
        input.value = '';
    }

})

/* EventListener para agregar la tarea cuando se presione el boton de enter */
document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false);
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        input.value = '';
        id++;
        console.log(LIST);
        }
    }
    
})

/* EventListener para cuando se presiona el boton de realizado o eliminado :) */
lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
});


