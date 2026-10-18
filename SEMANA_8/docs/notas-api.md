1. Análisis de la API (Checkpoints 1 y 2)

Antes de tocar el código, debes entender cómo responde la API. Al entrar a [https://rickandmortyapi.com/api/character]
(https://rickandmortyapi.com/api/character), observas la estructura JSON:   URL de la lista: [https://rickandmortyapi.com/api/character](https://rickandmortyapi.com/api/character).   

Dónde está el array de datos: Dentro del objeto principal, en la propiedad results.   
Dónde está la página siguiente: En info.next.   
Detalle: Cada elemento ya trae imagen, nombre, estado, especie y ubicación. No hay que pedir un detalle extra. Escribe esto en tu archivo docs/notas-api.md.

2. Conexión a la Red en api.js (Checkpoints 3 y 4)

Este archivo se encarga exclusivamente de ir a internet y traer los datos.   
Se crea la función asíncrona pedirJSON(url) usando fetch.   
Se incluye una validación de seguridad: if (!respuesta.ok) que lanza un error si el servidor falla (por ejemplo, un error 404 o 500).   
Se elimina cualquier rastro del antiguo archivo estático datos.js. 


3. Los Tres Estados Visuales en app.js (Checkpoints 5 y 6)

Una aplicación real nunca debe dejar la pantalla en blanco mientras piensa. 
En tu app.js, se manejan tres estados dentro de la función render():
Cargando (cargando = true): Muestra un texto con la clase animate-pulse (titileo) indicando que la petición está en camino.   
Error (error = "Mensaje"): Si falla el internet o el servidor, muestra un mensaje amable ("No pudimos cargar los personajes") y un botón para "Reintentar".   
Éxito / Vacío: Si la búsqueda no arroja resultados, muestra el texto "Ningún personaje coincide con la búsqueda". 

4. Paginación "Cargar más" (Checkpoints 7 y 8)

La Rick and Morty API divide sus más de 800 personajes en páginas de 20.   
La variable siguiente guarda la URL de la próxima página (datos.info.next).   
La función asíncrona cargar() hace la petición y usa la sintaxis [...personajes, ...datos.results] para sumar los 20 personajes nuevos a los que ya tenías en pantalla, en lugar de borrarlos.   
El botón se oculta automáticamente si info.next llega como null (última página).  

5. Favoritos Persistentes en favoritos.js (Checkpoints 9 y 10)

Para que los favoritos no se borren al recargar la página (F5), se usa el almacenamiento del navegador (localStorage).   
Como localStorage solo guarda texto plano, la función guardarFavoritos convierte tu arreglo de personajes a texto usando JSON.stringify(lista).   
La función leerFavoritos hace lo inverso: lee el texto y lo convierte de vuelta a objetos usando JSON.parse. Además, incluye un bloque 
try/catch para evitar que la aplicación colapse si los datos guardados se corrompen. 

6. La Vista de Favoritos (Checkpoints 11 y 12)

Se crea una navegación interna sin cambiar de archivo HTML.  
Los enlaces del menú en tu HTML (index_6.html) tienen el atributo data-vista="todos" y data-vista="favoritos".   
Al hacer clic, app.js actualiza la variable vista y ejecuta render().   
La función mágica aquí es listaActual(), la cual decide qué arreglo enviarle a la pantalla: return vista === 'favoritos' ? favoritos : personajes;.   
El botón de "Cargar más" se desactiva automáticamente en esta vista porque los favoritos no se paginan.