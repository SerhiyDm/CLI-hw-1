const { v4: uuidv4 } = require("uuid");
const path = require("path");
const file = require("fs").promises;
const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    let data = await file.readFile(contactsPath, "utf-8");
    data = JSON.parse(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getContactById(contactId) {
  try {
    let data = await listContacts();
    data = data.find((el) => el.id === contactId.toString());
    return data;
  } catch (e) {
    console.log(e);
  }
}
async function removeContact(contactId) {
  try {
    let data = await listContacts();
    data = data.filter((el) => el.id !== contactId.toString());
    await file.writeFile(contactsPath, JSON.stringify(data));
    return "Сontact deleted successfully!";
  } catch (e) {
    console.log(e);
  }
}

async function addContact(name, email, phone) {
  try {
    const contact = { name, email, phone, id: uuidv4() };
    let data = await file.readFile(contactsPath, "utf-8");
    data = JSON.parse(data);
    data.unshift(contact);
    await file.writeFile(contactsPath, JSON.stringify(data));
    return contact;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
