/**levantar un server para pruebas */
const express = require('express')
const supertest = require('supertest')

function testServer(){
    const app = express()
    route(app)
    return supertest(app)
}

module.exports = testServer