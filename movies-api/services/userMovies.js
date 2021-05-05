const MongoLib = require('../lib/mongo')

class UserMoviesServices {
  constructor () {
    this.collection = 'user-movies'
    this.MongoDB = new MongoLib()
  }

  async getUserMovies ({ userId }) {
    const query = userId && { userId }
    const userMovies = await this.MongoDB.getAll(this.collection, query)

    return userMovies || []
  }

  async createUserMovie ({ userMovie }) {
    const createUserMovieId = await this.MongoDB.create(this.collection, userMovie)
    return createUserMovieId
  }

  async deleteUserMovie ({ userMovieId }) {
    const deleteUserMovieId = await this.MongoDB.delete(this.collection, userMovieId)
    return deleteUserMovieId
  }
}

module.exports = UserMoviesServices
