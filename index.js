const config = require("./config.js");
const { Client, Collection } = require("discord.js");
const client = new Client({
  intents: config.CLIENT.intents,
  partials: config.CLIENT.partials,
});

require("./utils/event.js")(client);
require("./utils/mongoose.js");

global.client = client;
client.commands = new Collection();

client
  .login(config.TOKEN)
  .then(() => console.log(`${client.user.username} aktif!`))
  .catch((err) => console.error(`Botu aktif ederken bir hata meydana geldi! \n${err}`));

// Vu4ll
