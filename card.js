'use strict';

var columns = require('./columns');

module.exports = () => {

  var createCard = (opts, done) => {
    var status, description;
    if (!opts.hasOwnProperty('title')) {
      return done(new Error('missing title'));
    }
    if (!opts.hasOwnProperty('despcription')) {
      description = 'Default card';
    } else {
      description = opts.description;
    }
    if (!opts.hasOwnProperty('estimate')) {
      return done(new Error('missing estimate'));

    }
    if (typeof opts.estimate !== 'number') {
      return done(new Error('estimate should be number'));
    }
    if (!opts.hasOwnProperty('status')) {
      status = columns.COLUMNS[0].name;
    } else if (opts.hasOwnProperty('status') && columns.toInt(opts.status) === -1) {
      status = columns.COLUMNS[0].name;
    } else {
      status = opts.status;
    }

    var card = {
      status: status
    };
    card.title = opts.title;
    card.description = description;
    card.estimate = opts.estimate;
    done(null, card);
  };

  return {
    createCard: createCard
  };
};
