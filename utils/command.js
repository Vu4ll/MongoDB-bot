const fs = require("fs");
const slash = require("./slash.js");

module.exports = async (client) => {
  const commandFiles = fs
    .readdirSync("./cmds")
    .filter((file) => file.endsWith(".js"));

  let cmdArray = [];
  console.log(`${commandFiles.length} command will be loaded.`);
  commandFiles.forEach((file) => {
    const command = require(`../cmds/${file}`);
    client.commands.set(command.data.name, command);

    cmdArray.push(command);
    console.log(`Loaded command: ${command.data.name}.`);
  });

  const finalArray = cmdArray.map((e) => e.data.toJSON());
  slash.register(client.user.id, finalArray);
};

// Vu4ll
