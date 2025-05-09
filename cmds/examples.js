const { SlashCommandBuilder, MessageFlags, Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const model = require("../models/example"); // Models klasöründeki dosyamızı tanımladık

module.exports = {
  data: new SlashCommandBuilder()
    .setName("example")
    .setDescription("Veritabanı örnekleri")
    .addSubcommand((cmd) =>
      cmd
        .setName("kaydet")
        .setDescription("Veritabanına kayıt ekler")
        .addStringOption((option) =>
          option
            .setName("veri")
            .setDescription("Veritabanına kayıt edilecek veri")
            .setRequired(true)
        )
    )
    .addSubcommand((cmd) =>
      cmd.setName("veri").setDescription("Kayıtlı olan veriyi size gönderir")
    )
    .addSubcommand((cmd) =>
      cmd
        .setName("sil")
        .setDescription("Kayıtlı olan veriyi veritabanından siler")
    ),
  // Eğik çizgi komutumuz için gerekli ayarlarımızı yaptık

  /**
    * @param { Client } client
    * @param { ChatInputCommandInteraction } interaction
    * @param { EmbedBuilder } embed
    */
  run: async (client, interaction, embed) => {
    // Komutun kullanıldığı sunucudaki veriyi çektik ve tanımladık
    const data = await model.findOne({
      SERVER: interaction.guild.id,
    });

    if (interaction.options.getSubcommand() === "kaydet") {
      // Eğik çizgi komutumuzda belirtilen değeri tanımladık
      const veri = interaction.options.getString("veri");

      // Eğer bir veri varsa kanala mesaj gödersin
      if (data)
        return interaction.reply({
          content: `Bu sunucuda kayıtlı bir veri bulunmaktadır`,
          flags: MessageFlags.Ephemeral,
        });

      new model({
        SERVER: interaction.guild.id,
        EXAMPLE: veri,
      })
        .save() // Verimizi veritabanına kayıt ettik
        .then((x) => console.log(x)); // Konsola yazdırdık

      interaction.reply({
        content: `Veritabanına **${veri}** kaydı başarıyla eklendi.`,
        flags: MessageFlags.Ephemeral,
      }); // Ve kanala mesajımızı gönderdik
    } else if (interaction.options.getSubcommand() === "veri") {
      // Yukarıdaki data tanımı kullanarak veriyi alabiliriz

      // Veri yoksa yapılacak işlem
      if (!data)
        return interaction.reply({
          content: `Kayıtlı veri bulunamadı.`,
          flags: MessageFlags.Ephemeral,
        });

      interaction.reply({
        content: data.toString(), // Object bir değer verecektir. Sadece bir veriyi almak için `data.EXAMPLE` yazmak yeterlidir.
        flags: MessageFlags.Ephemeral,
      });
    } else if (interaction.options.getSubcommand() === "sil") {
      // Yukarıdaki data tanımı kullanarak veriyi silebiliriz

      // Veri yoksa yapılacak işlem
      if (!data)
        return interaction.reply({
          content: `Kayıtlı veri bulunamadı.`,
          flags: MessageFlags.Ephemeral,
        });
      // Veri varsa yapılacak işlem
      else if (data) {
        // Verimizi sildik
        return model.findOneAndRemove(data).then(() =>
          // Ve kanala mesajımızı gönderdik
          interaction.reply({
            content: `Kayıt veritabanından silindi`,
            flags: MessageFlags.Ephemeral,
          })
        );
      }
    }
  },
};

// Vu4ll
