const MongoLib = require('../lib/mongo')

class MoviesService {
  /** en vez de resolver con los mocks, vamos a resolver con nuestra instancia de mongo
   * para eso tenemos que agregar el constructor y le digamos que se implementen dos atributos que es la coleccion y la coleccion de movies y vamos a instanciar nuestra libreria de mongo
   */
  constructor () {
    this.collection = 'movies'
    this.mongoDB = new MongoLib()
  }

  async getMovies ({ tags }) {
    /** si existen los tags, entonces construimos el siguiente query que va a ser los tags que este dentro de los tags que le estamos pasando */
    const query = tags && { tags: { $in: tags } }
    /** el query nos va a servir para filtrar peliculas por tags */
    const movies = await this.mongoDB.getAll(this.collection, query)
    return movies || []
  }

  async getMovie ({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId)
    return movie || {}
  }

  async createMovie ({ movie }) {
    const createMovieId = await this.mongoDB.create(this.collection, movie)
    return createMovieId
  }

  async updateMovie ({ movieId, movie }) {
    const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie)
    return updatedMovieId
  }

  async deleteMovie ({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId)
    return deletedMovieId
  }
}

module.exports = MoviesService
