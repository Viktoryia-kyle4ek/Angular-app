(function() {
  'use strict';

  angular
      .module('notebook')
      .service('contact', contact);

  contact.$inject = ['ContactAPI'];

  /** @ngInject */
  function contact(ContactAPI) {

    this.findById = findById;
    this.findAll = findAllContacts;
    this.add = addContact;
    this.remove = removeContact;
    this.edit = editContact;

    function findById(id) {
      var contact = ContactAPI.get({id: id});
      return contact;
    }

    function findAllContacts(page, itemsPerPage, searchPredicate, sortPredicate, success) {
      var contacts = ContactAPI.query({
        filter: searchPredicate,
        sort: sortPredicate,
        offset: itemsPerPage * (page - 1),
        limit: itemsPerPage
      }, queryCallback);
      return contacts;

      function queryCallback(data, responseHeaders) {
        var length = +responseHeaders('X-Total-Count');
        if (success) {
          success(length);
        }
      }
    }

    function addContact(contact) {
      var newContact = new ContactAPI(contact);
      newContact.$save();
    }

    function removeContact(id, success) {
      ContactAPI.delete({id: id}, success);
    }

    function editContact(contact) {
      var updateContact = ContactAPI.update({ id: contact.id }, contact);
      return updateContact;
    }
  }

})();
