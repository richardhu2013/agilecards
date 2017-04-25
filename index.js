'use strict';

var Board = require('./board');

var board = new Board(4);

var opts = {
  title: 'testcard',
  description: 'test card',
  estimate: 20
};

board.iteration.createCard(opts, (err, res) => {
  console.log('new created card', res);
});
