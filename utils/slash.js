const slash = {
  register: async (clientId, commands) => {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");

    const rest = new REST({ version: "10" }).setToken(global.config.TOKEN);

    try {
      await rest
        .put(Routes.applicationCommands(clientId), { body: [] }) // Removing slash commands
        .then(async () => {
          await rest
            .put(Routes.applicationCommands(clientId), { body: commands }) // Setting up slash commands
            .then(() => {
              console.log(`Eğik çizgi komutları yüklendi.`);
            });
        });
    } catch (error) {
      console.error(`eğik çizgi komutları yüklenirken bir hata meydana geldi! \n${error}`);
    }
  },
};

module.exports = slash;

// Vu4ll
