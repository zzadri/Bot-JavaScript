const dotenv = require('dotenv'); dotenv.config();
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd', // nom du module
  once: false, // s'execute t'il une seule foit ?
  async execute(client, member) {

    const embed = new MessageEmbed()
      .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
      .setColor('#21ff81')
      .setDescription(`± Nom d'utilisateur: ${member}
      ± Créé le: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
      ± Rejoint le: <t:${parseInt(member.joinedTimestamp/ 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
      `)
      .setTimestamp()
      .setFooter({ text: 'L\'utilisateur a rejoint!' })

    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send({ embeds : [embed]})
  },
};