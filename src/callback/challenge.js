// por medio de postman copiamos la URL para hacer un llamado a la API que tenemos, ya que postman nos permite ver la DATA de una manera mas organizada.
// nuestra implementacion va a trabajar sobre node ya que no estamos llevando nada al navegador por eso todo lo estamos ejecutando desde nuestra consola o terminal.
//necesitamos instalar una depedencia llamada "install xmlhttprequest --save" la cual es un objeto en javascript el cual nos va permitir hacer peticiones ya sea un servicio atravez de la nube, alguna URL o API.

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
let API = "https://rickandmortyapi.com/api/character/" // ya tenemos la API a la cual le vamos hacer la peticion

// creamos una funcion que nos va permitir traer informacion desde nuestra API la cual le vamos a pasar un callback y despues desencadenamos los llamados que necesitamos
function fetchData(url_api, callback) {
    // generamnos la referencia al objeto que necesitamos en este caso...
    let xhttp = new XMLHttpRequest()
    // ya que lo tenemos instanciado atraves de "xhttp" ahora vamos empezar hacer un llamado a una url con ..
    xhttp.open("GET", url_api, true) // GET por que lo que queremos es traer esa informacion, despues le pasamos el url y al final le pasamos el true para que se maneje manera asincrona.
    xhttp.onreadystatechange = function (event) { // generamos lo que va hacer esa conexion, si estoisucede generamos una funcion la cual va a resivir un evento (no siempre se va a utilizar) ahora tenemos el espacion para hacer una validacion para saber si ejecutamos el callback, la validacionb es el estado en el cual se encuentra es satisfactorio.
        if (xhttp.readyState === 4) { // readState es el estado en el que se encuentra y lo igualamos a 4 que significa que a sido completado

            if (xhttp.status === 200) {// debemos saber el status en el cual se encuentra (200 quiere decir que todo esta bien)

                // lo que hacemos ahora es regresar el callback, normalmente callback utiliza un estandar dentro de node que permite decir que el primer valor que le vamos a pasar es el error y el segundo la informacion que se desencadena.

                callback(null, JSON.parse(xhttp.responseText)) // como el resultado es un JSON lo tenemos que parsiar ya que lo que resivimos es texto
            }
            else{ // si no esta sucediendo le mandamos el error
                const error = new Error (`error ${url_api}`)
                return callback(error, null)
            }
        }

    }
    xhttp.send()
}
// MULTIPLES PETICIONES AUN API CON CALLBACKS
// debemos hacer una peticion a nuestra API, obtener cuantos elementos tiene de personaje, acceder al primer personaje y obtener la ubicacion en la que se encuentra, vamos a realizar tres llamados a nuestra API CON CALLBACK.

// hacemos el llamado de la funcion la cual resive API, asi que debemos declararla, el segundo argumento es una funcion que en este caso es el callback el cual se va ejecutar

fetchData(API, function(error1, data1){
    // tenemos que validar por que tenemos que manejar errores...
    if (error1) return console.error(error1)
    fetchData(API + data1.results[0].id, function (error2, data2){
        if (error2) return console.error(error2)
        fetchData (data2.origin.url, function (error3, data3){
            if(error3) return console.error(error3)
            // imprimimos la informacion en la consola
            console.log(data1.info.count)
            console.log(data2.name)
            console.log(data3.dimension)
            
        })
    }) // utlizamos el resultado que seria data1 y sabemos que esta en results(al haber utilizado postman) y dentro de resutls vamos sobre el valor cero que es el primer personaje y obtenemos su ID. hacemnos la peticion al primer personaje. tenemos que pasar una funcion nuevamente que vendrian siendo error2 y data2 y nuevamente hacemos la tercera peticion (fetchData) para traer el origen de nuestro personaje.
    
}) 