'use strict';

var iteration = require('./iteration')();

function Board(columns) {
  this.iteration = iteration;
};

Board.prototype.createCard = (opts, done) => {
  this.iteration.createCard(opts, done);
};

module.exports = Board;
