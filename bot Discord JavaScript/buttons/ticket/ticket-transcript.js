const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const transcript = require('discord-html-transcripts');
const dotenv = require('dotenv'); dotenv.config();
const moment = require('moment');

moment.locale('fr');

module.exports = {

  name: 'ticket-transcript', // nom du module

  async runInteraction(client, interaction) {
    await interaction.deferReply()
    await client.channels.cache.get(`${process.env.LOG_CHANNEL_MEMBER}`).send({content: `Transcript du salon "${interaction.channel.name}" ${moment(interaction.channel.createdTimestamp).format('LT')}`, files: [await transcript.createTranscript(interaction.channel)]})
    await interaction.editReply({ content: `Le Transcript votre ticket a été créé avec succès`, ephemeral: true})
  },
};