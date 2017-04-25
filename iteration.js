'use strict';

var columns = require('./columns');
var validate = require('./validate');
var card = require('./card')();

module.exports = (opts) => {

  var colSets = [];
  var allCardTitles = new Set();
  var moveStack = [];

  for (var i = 0, ii = columns.COLUMNS.length; i < ii; i++) {
    colSets.push({});
  }

  var createCard = (opts, done) => {
    card.createCard(opts, done);
  };

  var add = (card, done) => {
    if (!validate.isValidCard(card)) {
      return done(new Error('invalid card'));
    }
    var col = columns.toInt(card.status);
    if (allCardTitles.has(card.title)) {
      return done(new Error('card already exists'));
    }
    // Check if it exceeds WIP limit
    getColumnCards(col, (err, res) => {
      if (err) {
        return done(new Error('get column cards error'));
      }
      var workload = res.reduce((acc, card) => {
        return acc + card.estimate;
      }, 0);
      if (columns.COLUMNS[col].limit !== -1 &&
        (workload + card.estimate) > columns.COLUMNS[col].limit) {
        return done(new Error('exceeding workload limit'));
      }
      colSets[col][card.title] = card;
      allCardTitles.add(card.title);
      done();
    });
  };

  var velocity = (done) => {
    var col = columns.toInt('done');
    getColumnCards(col, (err, res) => {
      if (err) {
        return done(err);
      }
      var speed = res.reduce((acc, card) => {
        return acc + card.estimate;
      }, 0);

      done(null, speed);
    });
  };

  var moveCard = (card, toColumn, done) => {
    if (!validate.isValidCard(card)) {
      done(new Error('invalid card'));
    }
    if (!validate.isValidColumn(toColumn)) {
      done(new Error('invalid column'));
    }

    var col = columns.toInt(card.status);
    if (col === toColumn) {
      // Same column, doing nothing
      return done(null, card);
    }
    // Delete card from original column sets
    delete colSets[col][card.title];

    //Change card status
    card.status = columns.COLUMNS[toColumn].status;

    colSets[toColumn][card.title] = card;
    var moveAction = {
      prev: col,
      current: toColumn,
      title: card.title
    };
    moveStack.push(moveAction);
    done(null, card);
  };

  var undoLastMove = (done) => {
    var move = moveStack.pop();
    if (move === undefined) {
      return done(new Error('no last move'));
    }
    var card = colSets[move.current][move.title];

    delete colSets[move.current][move.title];

    //Change card status back to last one
    card.status = columns.COLUMNS[move.prev].status;

    colSets[move.prev][move.title] = card;
    done(null, card);
  };

  var getColumnCards = (col, done) => {
    if (!validate.isValidColumn(col)) {
      done(new Error('invalid column'));
    }
    var colCards = [];
    for (var key in colSets[col]) {
      colCards.push(colSets[col][key]);
    }
    done(null, colCards);
  };

  return {
    createCard: createCard,
    add: add,
    velocity: velocity,
    moveCard: moveCard,
    getColumnCards: getColumnCards,
    undoLastMove: undoLastMove
  };
};
