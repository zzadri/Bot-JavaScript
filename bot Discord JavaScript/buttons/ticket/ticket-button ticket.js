const { MessageEmbed, MessageActionRow, MessageButton  } = require('discord.js');


const boutton = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setStyle("DANGER")
      .setLabel("Fermer le ticket")
      .setEmoji("🔒")
      .setCustomId("ticket-close"),
    
      new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("Demander le transcript")
      .setEmoji("📜")
      .setCustomId("ticket-transcript")
  )

module.exports = {

  name: 'ticket', // nom du module

  async runInteraction(client, interaction) {

    const channel = await interaction.guild.channels.create(`Ticket - ${interaction.member.displayName}`, {type: "GUILD_TEXT"})

    await interaction.reply({ content: `Votre ticket a été créé avec succès ${channel}`, ephemeral: true})

    await channel.permissionOverwrites.create(interaction.user, {
      SEND_MESSAGES: true,
      EMBED_LINKS: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    })
    await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
      SEND_MESSAGES: false,
      EMBED_LINKS: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false
    })

    const embed = new MessageEmbed()
    .setColor(process.env.MAIN_COLOR)
    .setTitle(`Tickets - ${interaction.member.displayName}`)
    .setDescription("Votre ticket a été crée, merci de renseigner toute les informations possibles dans se salon.")
    .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter({text: client.user.tag, iconURL: client.user.displayAvatarURL({dynamic: true})})

    await channel.send({ embeds: [ embed ], components: [boutton]});
  },

  
};