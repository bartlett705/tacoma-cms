var MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
/* FOR MONGO/MONGOOSE ONLY: Uncomment line below and replace the empty string with your local uri */
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/movies';

// var pg = require('pg');
// var Sequelize = require('sequelize');
/* FOR POSTGRES/SEQUELIZE ONLY: Uncomment line below and replace the empty string with your local uri */
// const uri = process.env.POSTGRES_URI || '';

// IMPORTANT: WHEN CONNECTING TO YOUR DATABASE, USE THE `uri` VARIABLE FROM ABOVE
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser').json();
const server = express();

// db setup
mongoose.connect(uri, (err) => {
  if (err) return console.error(err);
  console.log('connected to mongoDB');
});

const movieSchema = mongoose.Schema({
  title: String,
  rating: Number,
  category: String,
  awarded: Boolean,
  released: Date,
});

const Movie = mongoose.model('movies', movieSchema);

server.use(bodyParser);

server.post('/movies', (req, res) => {
  const newMovieObj = req.body;
  console.log('New movie! ', newMovieObj);
  Movie.create(newMovieObj)
    .then(movie => {
      console.log('Movie Written! ', movie);
    })
    .catch(err => console.log(err));
  res.end();
});

server.get('/movies', (req, res) => {
  Movie.find().then(movies => res.json(movies))
  .catch(err => console.log(err));
});

server.listen(9393, function () {
  console.log('Ahmad\'s movie server listening on Port 9393');
});
