'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CRUDStore = require('./CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _immutable = require('immutable');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
A store actions interface capable of performing action on a store data
*/
var CRUDActions = function () {

  /*
  Component constructor
  */

  // Properties type definitions
  function CRUDActions(crudStore) {
    _classCallCheck(this, CRUDActions);

    // Initializing fields
    this.crudStore = crudStore;
    this._preSearchData = null;
  }

  /*
  Asserting all values in record are valid
  */


  _createClass(CRUDActions, [{
    key: '_assertRecordValid',
    value: function _assertRecordValid(record) {
      // Iterating over all record properties and searching
      // for nan and undefined since this values probably indicate 
      // data corruption
      for (var prop in record) {
        // Asserting current value is valid(valid is not undefined and not NaN)
        if (record[prop] === undefined || record[prop] !== record[prop]) {
          // Declaring not valid
          console.log('CRUDActions._assertRecordValid: found not valid record for field \n                    ' + prop + ' and object: ' + JSON.stringify(record, null, 4));
          return false;
        }
      }

      // Declaring valid
      return true;
    }

    /*
    Adding a record to the store data
    */

  }, {
    key: 'create',
    value: function create(newRecord) {
      // Asserting all values in record are valid
      if (!this._assertRecordValid(newRecord)) {
        return;
      }

      // Asserting store is a server store
      if (this.crudStore.type === 'server') {
        // Executing record create action to server
        this.crudStore.executeServerDatabaseAction('create', newRecord);
      } else {
        // Creating new record in temporary store
        this.crudStore.setData(this.crudStore.getData().unshift(newRecord));
      }
    }

    /*
    Updating record in the store data
    */

  }, {
    key: 'updateRecord',
    value: function updateRecord(recordId, newRecord) {
      // Asserting all values in record are valid
      if (!this._assertRecordValid(newRecord)) {
        return;
      }

      // Retrieving old record
      var oldRecord = this.crudStore.getData().get(recordId);

      // Iterating over the new record to update and setting the invisible fields
      // value's so that they cannot change since invisible fields are not editable
      // in any circumstance
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.crudStore.getSchema()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var field = _step.value;

          // Asserting current field invisible, if yes saving the old value
          if (field.invisible) {
            newRecord[field.id] = oldRecord[field.id];
          }
        }

        // Asserting store is a server store
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (this.crudStore.type === 'server') {
        // Executing record update action to server
        this.crudStore.executeServerDatabaseAction('update', newRecord);
      } else {
        // Updating record in temporary store
        this.crudStore.setData(this.crudStore.getData().set(recordId, newRecord));
      }
    }

    /*
    Deleting a record from the store data
    */

  }, {
    key: 'delete',
    value: function _delete(recordId) {
      // Asserting store is a server store
      if (this.crudStore.type === 'server') {
        // Executing record delete action to server
        this.crudStore.executeServerDatabaseAction('delete', this.crudStore.getData().get(recordId));
      } else {
        // Retrieving store data
        var data = this.crudStore.getData();

        // Deleting a record from the store data and updating store data
        this.crudStore.setData(data.remove(recordId));
      }
    }

    /*
    Updating a field on a record in the store data
    */

  }, {
    key: 'updateField',
    value: function updateField(recordId, key, value) {
      // Retrieving the record that is requested to go over the field update 
      var record = this.crudStore.getData().get(recordId);

      // Asserting record retrieved successfully
      if (record) {
        // Updating field of record
        record[key] = value;

        // Updating record
        this.updateRecord(recordId, record);
      } else {
        throw "CRUDActions.updateField: record wasn't retrieved successfully";
      }
    }

    /*
    Initializing a search on the store data
    */

  }, {
    key: 'startSearching',
    value: function startSearching() {
      // Initializing the pre search data so that the data can be recovered when search is finished
      this._preSearchData = this.crudStore.getData();
    }

    /*
    Searching data, i.e, filter the store data to records that have the search string
    */

  }, {
    key: 'search',
    value: function search(e) {
      // Retrieving input html element with the search string
      var target = e.target;

      // Retrieving search string
      var needle = target.value.toLowerCase();

      // Asserting search was initialized
      (0, _invariant2.default)(this._preSearchData && this._preSearchData != null, "CRUDActions.search: search wasn't initialized");

      // If search string wasn't retrieved successfully or it is an empty string, stop search
      if (!needle) {
        this.crudStore.setData(this._preSearchData);
        return;
      }

      // Retrieving fields of data
      var fields = this.crudStore.getSchema().map(function (item) {
        return item.id;
      });

      // Retrieving all records that have the search string
      var searchData = void 0;
      if (this._preSearchData && this._preSearchData != null) {
        searchData = this._retrieveSearchData(this._preSearchData, fields, needle);

        // Updating data in store without committing since this update is temporary until
        // search in finished
        this.crudStore.setData(searchData);
      }
    }

    /*
    // Retrieving all records that have the search string
    */

  }, {
    key: '_retrieveSearchData',
    value: function _retrieveSearchData(data, fields, needle) {
      // Retrieving all records that have the search string
      return data.filter(function (row) {
        // Searching for search string in all fields
        for (var f = 0; f < fields.size; f++) {
          // Asserting current field has search string, if yes return true and if no 
          // continue searching
          if (row[fields.get(f)].toString().toLowerCase().indexOf(needle) > -1) {
            return true;
          }
        }

        // Declaring search string was not found in any field
        return false;
      });
    }

    /*
    Equality compare between strings or numbers
    */

  }, {
    key: '_eq',
    value: function _eq(a, b, descending) {
      // Initializing result
      var res = 0;

      // If both are numbers, make a number comparision
      if (typeof a === 'number' && typeof b === 'number') {
        res = a - b;
        // If not both are numbers, compare them as strings
      } else {
        res = String(a).localeCompare(String(b));
      }

      // Returning result based on if this is a descending or ascending order
      return descending ? -1 * res : res;
    }

    /*
    Sorting data in store
    */

  }, {
    key: 'sort',
    value: function sort(key, descending) {
      var _this = this;

      // Sorting data in store using in the given field
      this.crudStore.setData(this.crudStore.getData().sort(function (a, b) {
        return _this._eq(a[key], b[key], descending);
      }));
    }
  }]);

  return CRUDActions;
}();

exports.default = CRUDActions;