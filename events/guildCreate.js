const { Guild } = require("discord.js");
const client = global.client;

module.exports = {
  event: "guildCreate",

  /**
   * @param { Guild } guild 
   */
  run: async (guild) => {
    require("../utils/command")(client);
  },
};

// Vu4ll
