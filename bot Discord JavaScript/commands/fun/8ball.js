const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const flip = require('flip-text')

module.exports = {
  name: '8ball', // nom du module
  category: 'fun',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: '8ball [text]',
  examples: ['8ball suis-je beau ?'],
  description: 'cette commande permet de flip un texte.',
  async run(client, message, args) {
    if (!args[0]) return message.reply("Spécifier une question.");

    function Tab(array){
      var rand = Math.random()*array.length | 0;
      var rValue = array[rand];
      return rValue;
    }
    var myArray = ["je pense, oui", "oui", "non", "Essaye plus tard", "Essaye encore", "peut-être", "Très peu probable", "Pas d'avis", "C'est ton destin", "D'après moi oui", "C'est certain", "Oui absolument", "Tu peux compter dessus", "Peu probable", "Faut pas rêver", "N'y compte pas", "Impossible", "Très probable", "C'est bien parti"]
    var rValue = Tab(myArray);

    
    M1 =args[0]
    const user = message.author;

    const embed = new MessageEmbed()
    .setTitle(`🎱 8Ball, Question de ${user.username}`)
    .setDescription(`question: ${M1} \nréponse: ${rValue}`)
    message.channel.send({ content: ' ', embeds: [embed]})
  },
  options: [
    {
      name: 'question',
      description: 'inscrire une question.',
      type: 'STRING',
      required: true,
    }
  ],
  async runInteraction(client, interaction) {

    const question = interaction.options.getString('question');

    var eightball = ["je pense, oui", "oui", "non", "Essaye plus tard", "Essaye encore", "peut-être", "Très peu probable", "Pas d'avis", "C'est ton destin", "D'après moi oui", "C'est certain", "Oui absolument", "Tu peux compter dessus", "Peu probable", "Faut pas rêver", "N'y compte pas", "Impossible", "Très probable", "C'est bien parti"]

    function Tab(array){
      var rand = Math.random()*array.length | 0;
      var rValue = array[rand];
      return rValue;
    }
    var rValue = Tab(eightball);

    const user = interaction.user;

    const embedd = new MessageEmbed()
    .setTitle(`🎱 8Ball, Question de ${user.username}`)
    .setDescription(`question: ${question} \nréponse: ${rValue}`)
    interaction.reply({ embeds: [embedd], ephemeral: true})
    
  }
};