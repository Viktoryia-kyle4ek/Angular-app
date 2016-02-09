'use strict';

var express = require('express');
var contacts = require('../models/contact');
var dateformat = require('dateformat');

var router = express.Router();

router.route('/contacts/:id')
  .get(getContact)
  .delete(deleteContact)
  .put(updateContact);

router.route('/contacts')
  .post(addContact)
  .get(getContacts);

module.exports = router;



function getContact(req, res) {
  var id = req.params.id;
  var index = contacts.map(function(x) { return x.id; }).indexOf(+id);
  if (index !== -1) {
    return res
      .status(200)
      .json(contacts[index]);
  }
  return res
    .status(404)
    .json('Contact not found.');
}

function getContacts(req, res) {
  var params = parseUrl(req.query);
  var filterData = globalSearch(contacts, params.searchPredicate);
  var sortData = sort(JSON.parse(JSON.stringify(filterData)), params.sortPredicate, params.reverse);
  res.setHeader("X-Total-Count", sortData.length);
  return res
    .status(200)
    .json(sortData.slice(params.offset, params.offset + params.limit));
}

function addContact(req, res) {
  var contact = req.body;
  contact.id = Math.max.apply(null, contacts.map(function(x) { return x.id; })) + 1;
  contacts.unshift(contact);
  return res
    .status(200)
    .json({
      message: 'Contact added'
    });
}

function updateContact(req, res) {
  var contact = req.body;
  var id = req.params.id;
  var index = contacts.map(function(x) { return x.id; }).indexOf(+id);
  if (index !== -1) {
    contacts[index] = contact;
    return res
      .status(200)
      .json({
        message: 'Contact updated'
      });
  }
}

function deleteContact(req, res) {
  var id = req.params.id;
  var index = contacts.map(function(x) { return x.id; }).indexOf(+id);
  if (index !== -1) {
    contacts.splice(index, 1);
    return res.status(200).json('OK');
  }
  return res.status(400)
}

function parseUrl(url) {
  return {
    searchPredicate: url.filter || '',
    sortPredicate: url.sort ? url.sort.slice(1) : '',
    reverse: url.sort ? url.sort.charAt(0) !== '-' : '',
    offset: +url.offset || 0,
    limit: +url.limit
  }
}

function globalSearch(data, predicate) {
  if (!predicate) {
    return data;
  }
  var _predicate = predicate.trim().toLowerCase();
  var dateFormat = 'dd mmmm yyyy';
  return data.filter(function(obj) {
    for (var name in obj) {
      if (obj.hasOwnProperty(name) && name !== 'id') {
        if (obj[name] instanceof Date) {
          var date = dateformat(obj[name], dateFormat);
          if (date.toLowerCase().indexOf(_predicate) > -1) {
            return true;
          }
        } else if (obj[name].toString().toLowerCase().indexOf(_predicate) > -1) {
          return true;
        }
      }
    }
    return false;
  });
}

function sort(data, predicate, reverse) {
  if (!predicate) {
    return data;
  }
  if (!reverse) {
    return data.sort(function(a, b) {
      return a[predicate] > b[predicate] ? 1 : a[predicate] < b[predicate] ? -1 : 0;
    });
  }
  return data.sort(function(a, b) {
    return a[predicate] > b[predicate] ? -1 : a[predicate] < b[predicate] ? 1 : 0;
  });
}
