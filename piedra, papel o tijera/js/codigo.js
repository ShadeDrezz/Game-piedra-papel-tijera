// VARIABLES GLOBALES (Estado del juego)

let triunfos = 0
let perdidas = 0
// Definimos constantes para las jugadas
const PIEDRA = 1
const PAPEL = 2
const TIJERAS = 3

// constante para simplificar la escritura de codigo document...
const $ = selector => document.getElementById(selector)

// Funcion aleatorio
function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Funcion Opciones
function nombreEleccion(jugada){
    if(jugada == PIEDRA){
        return "Piedra"
    } else if(jugada == PAPEL){
        return "Papel"
    } else if(jugada == TIJERAS){
        return "Tijeras"
    } else {
        return "Jugada invalida"
    }
}

// Funcion para emogis
function emojiEleccion(jugada){
    if(jugada == PIEDRA) return "🪨"
    if(jugada == PAPEL) return "📃"
    if(jugada == TIJERAS) return "✂️"
    return "❓"
}


function iniciarJuego() {
    console.log("Juego Iniciado");
    $('btn-piedra').addEventListener('click', () => jugarRonda(PIEDRA))
    $('btn-papel').addEventListener('click', () => jugarRonda(PAPEL))
    $('btn-tijeras').addEventListener('click', () => jugarRonda(TIJERAS))
    
    $('boton-reiniciar').addEventListener('click', reiniciarJuego)
}

// Funcion de rondas
function jugarRonda(eleccionJugador) {
    let pc = aleatorio(1, 3)
    let mensajeResumen = `Elegiste ${emojiEleccion(eleccionJugador)} vs PC eligió ${emojiEleccion(pc)}.`;
    let resultadoRonda = ""
    let colorResultado = "white"

    if(pc == eleccionJugador){
        resultadoRonda = "¡Empate! 🤝"
        colorResultado = "wheat"
    } 
    // uso del operador || para disyuncion y simplificacion.
    else if((eleccionJugador == PIEDRA && pc == TIJERAS) || 
            (eleccionJugador == PAPEL && pc == PIEDRA) || 
            (eleccionJugador == TIJERAS && pc == PAPEL))
    { 
        resultadoRonda = "¡GANASTE LA RONDA! 🎉"
        triunfos = triunfos + 1
        colorResultado = "#a1ffaf"
    }
    else{
        resultadoRonda = "PERDISTE LA RONDA 😢"
        perdidas = perdidas + 1
        colorResultado = "#ffaaaa"
    }

// Actualizar marcador
    $('vidas-jugador').innerHTML = triunfos
    $('vidas-pc').innerHTML = perdidas
    
    let spanResultado = $('resultado-ronda');
    spanResultado.innerHTML = `${mensajeResumen}<br><strong>${resultadoRonda}</strong>`;
    spanResultado.style.color = colorResultado;

//  llamado a la funcion revisar
    revisarFinal()
}

function revisarFinal() {
    // Si llegamos a 3 victorias o 3 derrotas
    if (triunfos == 3 || perdidas == 3) {
        // Deshabilitar botones de juego
        $('btn-piedra').disabled = true
        $('btn-papel').disabled = true
        $('btn-tijeras').disabled = true

        // mensaje final
        let mensajeFinal = $('mensaje-final');
        if (triunfos == 3) {
            mensajeFinal.innerHTML = "🏆 ¡FELICITACIONES! Ganaste Eres Lo Mas Arrecho Que Hay 🏆"
            mensajeFinal.style.color = "#a1ffaf"
        } else {
            mensajeFinal.innerHTML = "💀 Suerte Para La Próxima, la PC  Te Domino 💀"
            mensajeFinal.style.color = "#ffaaaa"
        }

        // Mostrar boton reiniciar
        $('reiniciar-seccion').style.display = 'block'
        $('resultado-ronda').style.display = 'none' // Ocultamos el mensaje de la última ronda
    }
}

// function reiniciar

function reiniciarJuego() {
    location.reload()
}

// uso del evento load para que una vez que la pagina haya cargado se ejecute los codigo  scripts
window.addEventListener('load', iniciarJuego)