const express = require('express')
const session = require('express-session')

const app = express()

app.use(session({
  // no me guarde la cookie cada vez que se haga un cambio.Esta utilidad es necesaria para que si no es un cambio de sesion siempre se guarde en este mecanismo y almacenamiento
  resave: false,
  // por defecto, si la cookie no se ha inicializado, no me guarde por defecto
  saveUninitialized: false,
  // debe ser un string por lo menos de 256 bit, voy a utilizar esta palabra como ejemplo. Esto define que cuando la cookie es segura va a cifrarla haciendo uso de este secret
  secret: 'keyboard cat'
}))

app.get('/', (req, res) => {
  // verificar si en el request.session.count va a ser igual exactamente al re.session.count solo si existe más uno, de lo contrario por defecto va a ser uno
  req.session.count = req.session.count ? req.session.count + 1 : 1
  res.status(200).json({
    hello: 'world',
    counter: req.session.count
  })
})

app.listen(3000, () => {
  console.log('Listening http://localhost:3000')
})
