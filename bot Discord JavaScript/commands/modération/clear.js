const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'clear', // nom du module
  category: 'modération',
  permissions: ['MANAGE_MESSAGES'],
  ownerOnly: false,
  usage: 'clear [nombre] <@target>',
  examples: ['clear', 'clear 100', 'clear 150 @brawzz'],
  description: 'cette commande permet de retiré un ou plusieurs messages d\'un channel ou d\'une personne.',
  async run(client, message, args) {
    const amountToDelete = args[0];
    if ( isNaN(amountToDelete) || !args[0] || amountToDelete > 100 || amountToDelete < 2) return message.reply("Le nombre choisi doit être inférieur à 100 et supérieur à 1.");
    const target = message.mentions.users.find(u => u.id);
    await message.delete();

    const messageToDELETE = await message.channel.messages.fetch();

    if (target) {
      let i = 0;
      const filteredTargetMessages = [];
      (await messageToDELETE).filter(msg => {
        if (msg.author.id == target.id && amountToDelete > i) {
          filteredTargetMessages.push(msg); i++;
        }
      });

      await message.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
        message.channel.send(`${messages.size} message(s) envoyer par ${target} on été supprimé.`);
      });
    } else {
      await message.channel.bulkDelete(amountToDelete, true).then(messages => {
        message.channel.send(`${messages.size} message(s) envoyer dans ce salon on été supprimé.`);
      });
    }
  },
  options: [
    {
      name: 'message',
      description: 'Le nombre de message à supprimer',
      type: 'NUMBER',
      required: true,
    },
    {
      name: 'target',
      description: 'Choisir un utilisateur pour la suppression des messages.',
      type: 'USER',
      required: false,
    }
  ],
  async runInteraction(client, interaction) {
    const amountToDelete = interaction.options.getNumber('message');
    if (amountToDelete > 100 || amountToDelete < 0) return interaction.reply("nombre choisi doit être inférieur à 100 et supérieur à 0.");
    const target = interaction.options.getMember('target');

    const messageToDELETE = await interaction.channel.messages.fetch();

    if (target) {
      let i = 0;
      const filteredTargetMessages = [];
      (await messageToDELETE).filter(msg => {
        if (msg.author.id == target.id && amountToDelete > i) {
          filteredTargetMessages.push(msg); i++;
        }
      });

      await interaction.channel.bulkDelete(filteredTargetMessages, true).then(message => {
        interaction.reply({content: `${message.size} message(s) envoyer par ${target} on été supprimé.`, ephemeral: true})
      });
    } else {
      await interaction.channel.bulkDelete(amountToDelete, true).then(message => {
        interaction.reply({content: `${message.size} message(s) envoyer dans ce salon on été supprimé.`, ephemeral: true})
      });
    }
  }
};