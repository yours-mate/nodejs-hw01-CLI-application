const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join("db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId.toString());
    if (contact) {
      return console.log(contact);
    }
    return console.log(`Contact with id: ${contactId} not found!`);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (c) => c.id !== contactId.toString()
    );
    if (filteredContacts.length === contacts.length) {
      return console.log(`Contact with id: ${contactId} not found`);
    }

    fs.writeFile(contactsPath, JSON.stringify(filteredContacts), (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Contact with id ${contactId} was removed`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = { id: uniqid(), name: name, email: email, phone: phone };
    const newContacts = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`New contact with id ${newContact.id} was added`);
      console.log(listContacts());
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
