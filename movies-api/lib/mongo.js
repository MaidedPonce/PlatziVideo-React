const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.vxi55.mongodb.net/test`

class MongoLib {
  constructor () {
    /** le vamos a decir quién es el cliente y le vamos a decir que use nuestro sistema nuevo de parseo Url para tener la última conexión  */
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true })
    this.dbName = DB_NAME
  }

  connect () {
    /** Cada vez que nos conectemos a la bd no nos cree un nuevo cliente sino que si el cliente ya está y la conexión está abierta, pos ya está */
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err)
          }
          console.log('Connected succesfully to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }
    return MongoLib.connection
  }

  /** Definir acciones y luego implementar,Nos va a traer todos los elementos de la coleccion */
  getAll (collection, query) {
    return this.connect().then(db => {
      /** Retornar la base de datos, con eso mantenemos que retorne la promesa y le podemos dar un manejo asincrono, llamamos collection, donde le pasamos el nombre de la collection, le hacemos un punto find, le pasamos un query que es opcional y para poder manejarlo como tipo json, lo convertimos en array */
      return db.collection(collection).find(query).toArray()
    })
  }

  /** Un unico elemento */
  get (collection, id) {
    return this.connect().then(db => {
      /** que busque por id. Aqui no es necesario pasarlo a array porque nos va a devolver un objeto */
      return db.collection(collection).findOne({ _id: new ObjectId(id) })
    })
  }

  /** agregar datos a nuestra coleccion */
  create (collection, data) {
    return this.connect().then(db => {
      return db.collection(collection).insertOne(data)
    }).then(result => result.insertedId)
  }

  /** actualizar un dato en especifico */
  update (collection, id, data) {
    return this.connect().then(db => {
      /** si no existe, lo queremos agregar y entonces le pasamos el id, primero busca si existe y si si pues lo edita y si no, lo va a insertar, y como segundo parametro, le decimos que queremos actualizar ${} de acuerdo a la data que enviamos y upsert determina si actualiza o inserta */
      return db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true })
    }).then(result => result.upsertId || id)
  }

  delete (collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: new ObjectId(id) })
    }).then(() => id)
  }
}

module.exports = MongoLib
