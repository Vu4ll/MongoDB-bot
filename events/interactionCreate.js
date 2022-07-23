const client = global.client;
const { EmbedBuilder, InteractionType } = require("discord.js");

module.exports = {
  event: "interactionCreate",
  run: async (interaction) => {
    const command = client.commands.get(interaction.commandName);

    const embed = new EmbedBuilder()
      .setFooter({
        text: `${interaction.user.tag}`,
        iconURL: interaction.user.avatarURL({ dynamic: true }),
      })
      .setColor("BLACK")
      .setTimestamp();

    if (interaction.type === InteractionType.ApplicationCommand)
      command.run(client, interaction, embed);
  },
};

// Vu4ll
