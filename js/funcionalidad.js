var hombre = new Array("___\n", "   |\n", "   O\n", "  /", "|", "\\\n", "  /", " \\\n", "___")
var palabra
var libreriaPalabras = new Array("p o o", "s e r v i d o r", "p r o t o c o l o", "l o g i c a",
"n a v e g a d o r", "b u r b u j a", "p a g i n a", 
 "v i r t u a l", "m e m o r i a", "r e q u e r i m i e n t o s" )
var partes = 0
var colNueva = 0
var jugando


function ObtienePalabra() {
   //obtiene la palabra para jugar de forma pseudoaleatoria
   var indice = Math.round ( Math.random() * 9 )
   var cadena = new String( libreriaPalabras[indice] )
   palabra = cadena.split(" ")

}


function DibujaHombre(visor, partes) {
   //dibuja el hombre ahorcado
   //partes indica el numero de partes a dibujar
   var dibujo = ""
   if (partes < 10)
      for(var x = 0; x < partes; x++) {
         dibujo += hombre[x]
      }
   visor.displayHombre.value = dibujo
}


function DibujaLetra(visor, letra) {
   //dibuja una letra de la palabra
   //posicion indica donde debe dibujar la letra
   var flag = false 
   //indica si se encontro la letra 
   //obtiene cadena actual
   var cadena = new String(visor.displayPalabra.value)
   //la separa en sus espacios
   var letrasCadena = cadena.split(" ")
   cadena = "" 
   for (var x = 0; x < palabra.length; x++) {
      if (palabra[x] == letra) {
         cadena += letra + " "
         flag = true
      } else
         cadena += letrasCadena[x] + " "
   }
   visor.displayPalabra.value = cadena
   return flag
}


function NuevaLetra(visor, letra) {
   //añade letra lista de letras
   visor.displayLetras.value += letra + " "
   //comprueba si ha de pasar a la siguiente fila
   if(colNueva == 3) {
      visor.displayLetras.value += "\n"
      colNueva = 0
   } else
      colNueva++
}


function Juega(visor, letra) {
   //comprueba si esta jugando
   if (jugando) {
      //ciclo de jugada
      //1. añade letra a la lista
      NuevaLetra(visor, letra)
      //2. dibuja la letra y comprueba si acierto
      var acierto = DibujaLetra(visor, letra)
      //3. si no acierto, dibuja hombre
      if (!acierto)
         DibujaHombre(visor, ++partes)
      //4. comprueba si fin
      if (partes == 9)
         FinJuego(false)
      else if (CompruebaPalabra(visor))
         FinJuego(true)
      } else {
         alert('Pulsa Juego nuevo para comenzar\nuna partida nueva.')
   }
}

function IniciaJuego(visor) {
   //inicializa visor y variables globales
   jugando = true
   partes = 0
   colNueva = 0
   ObtienePalabra()
   DibujaHombre(visor, partes)
   visor.displayPalabra.value = ""
   for (var x = 0; x < palabra.length; x++)
      visor.displayPalabra.value += "_ "
   visor.displayLetras.value = ""
}

function CompruebaPalabra(visor) {
   //comprueba si se completo toda la palabra
   var fin = true
   //obtiene cadena actual
   var cadena = new String(visor.displayPalabra.value)
   //la separa en sus espacios
   var letrasCadena = cadena.split(" ")
   for(var x = 0; x < letrasCadena.length; x++)
      if (letrasCadena[x] == "_")
         fin = false
   return fin
}


function FinJuego(resultado) {
   //indica que si se ha perdido o ganado
   var solucion = ""
   jugando = false 
   if (resultado) {
      document.visor.ganadas.value++
      alert("Acertaste !")
   } else {
     document.visor.perdidas.value++
     //construye la palabra solucion
     for (var x = 0; x < palabra.length; x++)
        solucion += palabra[x]
     alert("Has muerto !\n La palabra era: " + solucion)
   }
}