'use strict';

const STARTING = 'starting';
const WORKINPROGRESS = 'workinprogress';
const RESOLVED = 'resolved';
const DONE = 'done';

var COLUMNS = [{
  name: STARTING,
  limit: -1
}, {
  name: WORKINPROGRESS,
  limit: 100
}, {
  name: RESOLVED,
  limit: 200
}, {
  name: DONE,
  limit: -1
}];

var INDEX = {};
for (var i = 0, ii = COLUMNS.length; i < ii; i++) {
  INDEX[COLUMNS[i].name] = i;
}

module.exports = {
  COLUMNS: COLUMNS,
  INDEX: INDEX,
  toString: (i) => {
    if (!COLUMNS.hasOwnProperty(i)) {
      return false;
    }
    return COLUMNS[i].name;
  },
  toInt: (s) => {
    var columnNames = COLUMNS.map((x) => {
      return x.name
    });
    if (columnNames.indexOf(s) === -1) {
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
