'use strict';

var firstnames = ['Roma', 'John', 'Anna', 'Julia', 'Peter', 'Karl', 'Emma', 'Max', 'Melany', 'Denis', 'Joseph', 'Johny'];
var lastnames = ['Akerman', 'Allen', 'Blackman', 'Chapman', 'Daniels', 'Eason', 'Ellis', 'Gray', 'Hardy', 'Jepson', 'Mallory', 'Mann'];
var companies = ['Itransition', 'iTechart', 'EffectiveSoft', 'Intetics', 'Epam', 'Wargaming', 'IBA', 'OmegaSoftwere', 'Softeq Development',
                  'ISsoft Solutions', 'Qulix Systems', 'CodeX Software'];
var birthdates = ['1993-11-23', '1995-05-14', '1987-12-11', '1999-09-09', '2001-09-11', '1992-06-24', '1980-07-25',
                  '1992-08-13', '2001-05-28', '1985-01-01', '1987-06-03', '1992-02-18'];
var count = firstnames.length;

function generateRandomContact(id) {
  var firstname = firstnames[Math.floor(Math.random() * count)];
  var lastname = lastnames[Math.floor(Math.random() * count)];
  var birthdate = birthdates[Math.floor(Math.random() * count)];
  var company = companies[Math.floor(Math.random() * count)];

  return {
    id: id,
    firstname: firstname,
    lastname: lastname,
    company: company,
    phone: generateRandomPhone(),
    birthdate: new Date(birthdate)
  }
}

function generateRandomPhone() {
  return '+' + Math.random().toString().slice(2,11);
}

var contacts = [];
for (var i = 0; i < 100; i += 1) {
  contacts.push(generateRandomContact(i));
}

module.exports = contacts;
