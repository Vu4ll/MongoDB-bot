const client = global.client;

module.exports = {
  event: "guildCreate",
  run: async (guild) => {
    require("../utils/command")(client);
  },
};

// Vu4ll
