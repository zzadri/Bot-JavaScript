const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'userinfo', // nom du module
  category: 'contextuel',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'utiliser le menu contextuel de Discord',
  examples: ['utiliser le menu contextuel de Discord'],
  type: 'USER',
  async runInteraction(client, interaction) {

    const member = await interaction.guild.members.fetch(interaction.targetId)

    const embed = new MessageEmbed()
      .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://img.icons8.com/color/48/000000/bmo.png' : 'https://img.icons8.com/cotton/64/000000/men-age-group-4.png' })
      .setColor('#8e48f7')
      .setImage(member.user.displayAvatarURL())
      .setFields(
        { name: 'Nom', value: `${member.displayName}`, inline: true },
        { name: 'Modérateur', value: `${member.kickable ? '❌' : '✅'}`, inline: true },
        { name: 'Bot', value: `${member.user.bot ? '✅' : '❌'}`, inline: true },
        { name: 'Rôles', value: `${member.roles.cache.map(role => role).join(',').replace(',@everyone', ' ')}`},
        { name: 'A créé son compte le', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
        { name: 'a rejoint le serveur le', value: `<t:${parseInt(member.joinedTimestamp/ 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`},
      )

      interaction.reply({ embeds: [embed], ephemeral: true})
  }
};