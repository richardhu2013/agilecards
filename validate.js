'use strict';

var columns = require('./columns');

module.exports = {
  isValidCard: (card) => {
    if (!card.hasOwnProperty('status')) {
      return false;
    }
    if (!card.hasOwnProperty('title')) {
      return false;
    }
    if (!card.hasOwnProperty('estimate')) {
      return false;
    }
    if (typeof card.estimate !== 'number') {
      return false;
    }
    if (parseInt(card.estimate) > 100) {
      return false;
    }
    return true;
  },

  isValidColumn: (col) => {
    if (isNaN(parseInt(col))) {
      return false;
    }
    if (parseInt(col) < 0 || parseInt(col) > columns.COLUMNS.length - 1) {
      return false;
    }
    return true;
  }
};
