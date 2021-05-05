const joi = require('@hapi/joi')

const { movieIdSchema } = require('./movies')
const { userIdSchema } = require('./users')

const userIdSchem = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createUserMovieSchema = {
  userId: userIdSchem,
  movieId: movieIdSchema
}

module.exports = {
  userIdSchema,
  createUserMovieSchema
}
