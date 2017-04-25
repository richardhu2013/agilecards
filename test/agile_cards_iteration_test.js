'use strict';

var iteration = require('../iteration')();
var card1, card2, card3;

exports.agile_cards_iteration = {

  'create card 1 with status starting': (test) => {
    var opts = {
      title: 'testcard',
      description: 'test card',
      estimate: 20
    };
    iteration.createCard(opts, (err, res) => {
      card1 = res;
      test.done();
    });
  },

  'verify card 1 is added to starting column': (test) => {
    iteration.add(card1, (err) => {
      test.ok(!err);
      test.done();
    });
  },

  'verify starting column card number is 1': (test) => {
    iteration.getColumnCards(0, (err, res) => {
      test.ok(!err);
      test.equal(res.length, 1);
      test.done();
    });
  },

  'deny add card 1 again to starting column': (test) => {
    iteration.add(card1, (err) => {
      test.ok(err);
      test.equal(err.message, 'card already exists');
      test.done();
    });
  },

  'verify card 1 stays same status if it is moved to same column': (test) => {
    iteration.moveCard(card1, 0, (err, res) => {
      test.ok(!err);
      test.equal(res.status, 'starting');
      test.done();
    });
  },

  'create card 2 with status starting': (test) => {
    var opts = {
      status: 'starting',
      title: 'testcard2',
      description: 'test card',
      estimate: 20
    };
    iteration.createCard(opts, (err, res) => {
      test.ok(!err);
      card2 = res;
      test.done();
    });
  },

  'add card 2 to column 0 - starting': (test) => {
    iteration.add(card2, (err) => {
      test.ok(!err);
      test.done();
    });
  },

  'get all cards of column 0 - starting': (test) => {
    iteration.getColumnCards(0, (err, res) => {
      test.ok(!err);
      test.equal(res.length, 2);
      test.done();
    });
  },

  'verify card changed to new status after moving to new column': (test) => {
    iteration.moveCard(card1, 1, (err, res) => {
      test.ok(!err);
      test.equal(res.status, 'workinprogress');
      test.done();
    });
  },

  'verify velocity is 0 without any cards in done column': (test) => {
    iteration.velocity((err, res) => {
      test.ok(!err);
      test.equal(res, 0);
      test.done();
    });
  },

  'move card 1 to column done': (test) => {
    iteration.moveCard(card1, 3, (err, res) => {
      test.ok(!err);
      test.equal(res.status, 'done');
      test.done();
    });
  },

  'verify velocity is 20': (test) => {
    iteration.velocity((err, res) => {
      test.ok(!err);
      test.equal(res, 20);
      test.done();
    });
  },

  'move card2 to column done': (test) => {
    iteration.moveCard(card2, 3, (err, res) => {
      test.ok(!err);
      test.equal(res.status, 'done');
      test.done();
    });
  },

  'verify velocity is 40': (test) => {
    iteration.velocity((err, res) => {
      test.ok(!err);
      test.equal(res, 40);
      test.done();
    });
  },

  'Undo last move and verify card 2 back to last status - starting': (test) => {
    iteration.undoLastMove((err, res) => {
      test.ok(!err);
      test.equal(res.status, 'starting');
      test.done();
    });
  },

  'move card2 to column workinprogress': (test) => {
    iteration.moveCard(card2, 1, (err, res) => {
      test.ok(!err);
      card2 = res;
      test.equal(res.status, 'workinprogress');
      test.done();
    });
  },

  'create card 3 with status workinprogress and estimate 90': (test) => {
    var opts = {
      status: 'workinprogress',
      title: 'testcard3',
      description: 'test card',
      estimate: 90
    };
    iteration.createCard(opts, (err, res) => {
      test.ok(!err);
      card3 = res;
      test.done();
    });
  },

  'deny add card3 to workinprogress as workload will exceed limit 100': (test) => {
    iteration.add(card3, (err) => {
      test.ok(err);
      test.equal(err.message, 'exceeding workload limit');
      test.done();
    });
  },

  'quit-test': (test) => {
    test.done();
  }
};
