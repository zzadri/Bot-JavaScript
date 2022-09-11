const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();


module.exports = {
  name: 'nick', // nom du module
  category: 'fun',
  permissions: ['CHANGE_NICKNAME'],
  ownerOnly: false,
  usage: 'nick [message] <@member>',
  examples: ['nick', 'nick jaimelefromage', 'nick off'],
  description: 'cette commande permet de changer de pseudo.',
  async run(client, message, args) {
    if (!args[1]) return message.reply("Spécifier un nick.")

    const memberToEdit = message.mentions.members.first();
    const newNickname = message.content.replace(`.nick`, '' && `${memberToEdit}`, '').split(' ').pop().trim();

    if ( args[1] == "off") {
      memberToEdit.setNickname("");
      return
    };

    memberToEdit.setNickname(newNickname);



    //message.member.setNickname(nick);

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