const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const boutton = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("ouvrir un ticket")
      .setEmoji("📩")
      .setCustomId("ticket")
  )


module.exports = {

  name: 'ticket', // nom du module
  category: 'modération',
  permissions: ['MANAGE_GUILD'],
  ownerOnly: false,
  usage: 'ticket',
  examples: ['ticket'],
  description: 'cree un ticket',

  async run(client, message, args) {

    const embed = new MessageEmbed()
    .setColor(process.env.MAIN_COLOR)
    .setTitle(`Tickets`)
    .setDescription("🗣️ Notre équipe est à votre disposition 🗣️\n\nAppuyer sur le bouton ci-dessous pour ouvrir un Ticket")

    await message.delete()
    return message.channel.send({ embeds: [ embed ], components: [boutton]});

  },

  async runInteraction(client, interaction) {
    const embed = new MessageEmbed()
    .setColor(process.env.MAIN_COLOR)
    .setTitle(`Tickets`)
    .setDescription("🗣️ Notre équipe est à votre disposition 🗣️\n\nAppuyer sur le bouton ci-dessous pour ouvrir un Ticket")

    return interaction.channel.send({ embeds: [ embed ], components: [boutton]});
  },
};