const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const moment = require('moment');


module.exports = {
  name: 'serveur-info', // nom du module
  category: 'fun',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'nick [message] <@member>',
  examples: ['nick', 'nick jaimelefromage', 'nick off'],
  description: 'cette commande permet de changer de pseudo.',
  async run(client, message, args) {

    const regions = {
      brazil: 'Brazil', 
      EUROPE: 'Europe', 
      hongkong: 'Hong Kong', 
      india: 'India', 
      japan: 'Japan', 
      russia: 'Russia', 
      singapore: 'Singapore', 
      southafrica: 'South Africa', 
      sydeny: 'Sydeny', 
      'us-central': 'US Central',
      'us-east': 'US Eastside',
      'us-west': 'US Westside',
      'us-south': 'US Southside'
    };

    const verificationLevels = {
      NONE: 'Aucun',
      LOW: 'Bas',
      MEDIUM: 'Moyen',
      HIGH: 'Haute (╯°□°）╯︵ ┻━┻',
      VERY_HIGH: 'Vraiment haute ┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
    };

    const MFALevel = {
      NONE: 'Aucun',
      ELEVATED: 'élevé'
    };

    const PremiumTier = {
      NONE: 'Aucun',
      TIER_1: '1',
      TIER_2: '2',
      TIER_3: '3'
    };

    moment.locale('fr');

    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}`)
      .setThumbnail(`${message.guild.iconURL()}`)
      .setDescription(`Owner: <@${message.guild.ownerId}>`)
      .addFields(
        {name: "MFALevel", value: `${MFALevel[message.guild.mfaLevel]}`, inline: true},
        {name: "ㅤ", value: `ㅤ`, inline: true},
        {name: "Niveau de Vérification", value: `${verificationLevels[message.guild.verificationLevel]}`, inline: true},
        {name: "Pays", value: `${regions[message.guild.region] || '❌'}`, inline: true},
        {name: "ㅤ", value: `ㅤ`, inline: true},
        {name: "Niveau Boost", value: `${message.guild.premiumTier ? `Niveau : ${PremiumTier[message.guild.premiumTier]}` : 'Aucun.'}`, inline: true},
        {name: "Salon afk", value: `<#${message.guild.afkChannelId}>`, inline: true},
        {name: "ㅤ", value: `ㅤ`, inline: true},
        {name: "Serveur créé le", value: `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} \`[${moment(message.guild.createdTimestamp).fromNow()}]\``, inline: true},
        {name: "Total de Membre", value: `${message.guild.memberCount}`, inline: true},
        {name: "ㅤ", value: `ㅤ`, inline: true},
        {name: "Nombre de channel", value: `${message.guild.channels.cache.size}`, inline: true},
        {name: "Nombre d'emoji", value: `${message.guild.emojis.cache.size}`, inline: true},
        {name: "ㅤ", value: `ㅤ`, inline: true},
        {name: "Nombre de rôle", value: `${message.guild.roles.cache.size}`, inline: true},

      )
    return message.channel.send({ embeds: [ embed ]});
    

  },
  options: [
    {
      name: 'nick',
      description: 'Choisir un surnom.',
      type: 'STRING',
      required: true,
    }
  ],
  async runInteraction(client, interaction) {
    
    const nick = interaction.options.getString('nick')


    if ( nick == "off") {
      interaction.member.setNickname("");
      interaction.reply({ content: 'surmon remis a zero.', ephemeral: true});
      return
    };

    interaction.member.setNickname(nick);
    interaction.reply({ content: 'surmon bien changer.', ephemeral: true});
  }
};

