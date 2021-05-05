const jwt = require('jsonwebtoken')
// el process argument lee los comandos de la terminal pero los primeros dos parametros que no los estamos definiendo son el el proceso de node y el archivo que estamos leyendo por lo que nosotros empezaremos a leer desde el tercer argumento, la opcion esta definida por verificar o firmar, luego vamos a pedir el secreto y luego el nombre o token
const [, , option, secret, nameOrToken ] = process.argv

if (!option || !secret || !nameOrToken) {
    return console.log('Missing arguments')
}
// despues de que pasa nuestra prueba de argumentos
function signToken(payload, secret) {
    return jwt.sign(payload, secret)
}
// retirna el token verificado
function verifyToken(token, secret) {
    return jwt.verify(token, secret)
}

if(option == 'sign') {
    console.log(signToken({ sub: nameOrToken}, secret))
}else if (option == 'verify'){
    console.log(verifyToken(nameOrToken, secret))
}else {
    console.log('Option needs to be "sign" or "verify"')
}