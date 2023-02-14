const contacts = require("./contacts");
const argv = require("yargs-parser")(process.argv.slice(2));
const colors = require("colors");

async function tryAndCatch(func) {
  try {
    const data = await func();
    return data;
  } catch (e) {
    console.warn(e);
  }
}

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data1 = await tryAndCatch(contacts.listContacts);
      if (data1.length === 0) {
        console.log(colors.yellow(" The list is empty!"));
        return;
      }
      return data1.map(({ id, name, email, phone }) => {
        console.log(
          colors.cyan(
            ` name: ${colors.yellow(name)}, phone: ${colors.yellow(
              phone
            )}, email: ${colors.yellow(email)}, id: ${colors.yellow(id)}`
          )
        );
        console.log("");
      });

      break;

    case "get":
      let data2 = await tryAndCatch(
        async () => await contacts.getContactById(id)
      );
      data2 = data2
        ? colors.cyan(
            `name: ${colors.yellow(data2.name)},  phone: ${colors.yellow(
              data2.phone
            )},  email: ${colors.yellow(data2.email)},  id: ${colors.yellow(
              data2.id
            )}`
          )
        : colors.red(" NO SUCH CONTACT EXISTS!");
      console.log(" ", data2);
      break;

    case "add":
      const data3 = await tryAndCatch(
        async () => await contacts.addContact(name, email, phone)
      );
      console.log(
        colors.cyan(
          ` ${colors.yellow(data3.name)} ${colors.yellow(
            data3.phone
          )} has been successfully added to the contact book!`
        )
      );
      break;

    case "remove":
      let data4 = await tryAndCatch(
        async () => await contacts.removeContact(id)
      );
      data4 = data4
        ? colors.blue(" Сontact deleted successfully!")
        : colors.red(" NO SUCH CONTACT EXISTS!");
      console.log(data4);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
