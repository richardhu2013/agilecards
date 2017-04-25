'use strict';

const STARTING = 'starting';
const WORKINPROGRESS = 'workinprogress';
const RESOLVED = 'resolved';
const DONE = 'done';

var COLUMNS = [{
  status: 'starting',
  limit: -1
}, {
  status: 'workinprogress',
  limit: 100
}, {
  status: 'resolved',
  limit: 200
}, {
  status: 'done',
  limit: -1
}];

var INDEX = {};
for (var i = 0, ii = COLUMNS.length; i < ii; i++) {
  INDEX[COLUMNS[i].status] = i;
}

module.exports = {
  COLUMNS: COLUMNS,
  INDEX: INDEX,
  toString: (i) => {
    if (!COLUMNS.hasOwnProperty(i)) {
      return false;
    }
    return COLUMNS[i].status;
  },
  toInt: (s) => {
    var STATUSES = COLUMNS.map((x) => {
      return x.status
    });
    if (STATUSES.indexOf(s) === -1) {
      return -1;
    }
    return INDEX[s];
  },
  validateInt: (i) => {
    if (typeof i !== 'number') {
      return false;
    }
    if (!COLUMNS[i]) {
      return false;
    }
    if (i === 0) {
      return false;
    }
    return true;
  }
};
