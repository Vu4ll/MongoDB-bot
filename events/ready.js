const client = global.client;

module.exports = {
  event: "ready",
  run: async () => {
    require("../utils/command")(client);
  },
};

// Vu4ll
