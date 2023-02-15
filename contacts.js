const { v4: uuidv4 } = require("uuid");
const path = require("path");
const file = require("fs").promises;
const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  let data = await file.readFile(contactsPath);
  data = JSON.parse(data);
  return data;
}

async function getContactById(contactId) {
  let data = await listContacts();
  data = data.find((el) => el.id === contactId.toString());
  return data ? data : null;
}
async function removeContact(contactId) {
  let data = await listContacts();
  if (!data.find((el) => el.id === contactId.toString())) {
    return false;
  }
  data = data.filter((el) => el.id !== contactId.toString());
  await file.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return "Сontact deleted successfully!";
}

async function addContact(name, email, phone) {
  const contact = { name, email, phone, id: uuidv4() };
  let data = await listContacts();
  data.unshift(contact);
  await file.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
