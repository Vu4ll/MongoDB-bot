const { Client, Partials, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({
  intents: Object.values(GatewayIntentBits).filter(
    (x) => typeof x === "string"
  ),
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
  ],
});

require("./utils/event.js")(client);
require("./utils/mongoose.js");
global.config = require("./config.json");
global.client = client;
client.commands = new Collection();

client
  .login(global.config.TOKEN)
  .then(() => console.log(`${client.user.username} aktif!`))
  .catch((err) => console.error(`Botu aktif ederken bir hata meydana geldi! \n${err}`));

// Vu4ll
