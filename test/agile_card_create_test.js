'use strict';

var card = require('../card')();

exports.agile_card_create = {

  'deny to create card if title is missing': (test) => {
    var opts = {
      description: 'test card',
      estimate: 20
    };
    card.createCard(opts, (err, res) => {
      test.ok(err);
      test.done();
    });
  },

  'deny to create card if estimate is missing': (test) => {
    var opts = {
      title: 'testcard',
      description: 'test card'
    };
    card.createCard(opts, (err, res) => {
      test.ok(err);
      test.equal(err.message, 'missing estimate');
      test.done();
    });
  },

  'deny to create card if estimate is not number': (test) => {
    var opts = {
      title: 'testcard',
      description: 'test card',
      estimate: 'NotANumber'
    };
    card.createCard(opts, (err, res) => {
      test.ok(err);
      test.equal(err.message, 'estimate should be number');
      test.done();
    });
  },

  'verify new card default status is starting': (test) => {
    var opts = {
      title: 'testcard',
      description: 'test card',
      estimate: 20
    };
    card.createCard(opts, (err, res) => {
      test.ok(!err);
      test.equal(res.status, 'starting');
      test.done();
    });
  },

  'verify new card status is as specified': (test) => {
    var opts = {
      status: 'resolved',
      title: 'testcard',
      description: 'test card',
      estimate: 20
    };
    card.createCard(opts, (err, res) => {
      test.ok(!err);
      test.equal(res.status, 'resolved');
      test.done();
    });
  },

  'quit-test': (test) => {
    test.done();
  }
};
