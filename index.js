const contacts = require("./contacts");
const argv = require("yargs-parser")(process.argv.slice(2));

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data1 = await contacts.listContacts();
      console.log(data1);
      break;

    case "get":
      const data2 = await contacts.getContactById(id);
      console.info(data2);
      break;

    case "add":
      const data3 = await contacts.addContact(name, email, phone);
      console.info(
        `${data3.name} ${data3.phone} has been successfully added to the contact book!`
      );
      break;

    case "remove":
      const data4 = await contacts.removeContact(id);
      console.info(data4);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
