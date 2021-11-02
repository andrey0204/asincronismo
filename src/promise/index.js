// PROMESAS

const somethingWillHappen = () => {
    return new Promise((resolve, reject) => { // retornamos una nueva promesa. esta tendra dos argumentos si se resuelve o si es rechazada
        // creamos una validacion
        if (true) {
            resolve("se logro")
        }
        else {
            reject("no se logro")
        }

    })
}

somethingWillHappen() // tenemos dos elementos que estan encadenados en este caso es el .then
    .then(response => console.log(response))
    .catch(err => console.error(err))


const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => {
                resolve("true")
            }, 2000)
        }
        else {
            const error = new Error(" se produjo un error")
            reject(error)
        }
    })
}

somethingWillHappen2()
    .then(response => console.log(response))
    .catch(err => console.error(err))

//para correr varias promesas al mismo tiempo o encadenadas nos permite ejecuitar estas promesas al mismo tiempo y retornar un arreglo con los resultados..

Promise.all([somethingWillHappen(), somethingWillHappen2()])
    .then(response => {
        console.log("Array of results", response)
    })
    .catch(err => {
        console.error(err)
    })