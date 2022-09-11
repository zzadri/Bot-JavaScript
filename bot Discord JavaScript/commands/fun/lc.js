const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
  name: 'lc', // nom du module
  category: 'fun',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'lc [@member] [@member]',
  examples: ['lc @Glaacy @Tenebrics'],
  description: 'cette commande permet de calculer l\'amour entre 2 personne.',
  async run(client, message, args) {
    if (!args[0]) return message.reply("Spécifier un premier membre.");
    if (!args[1]) return message.reply("Spécifier un seconds membre.");

    const set = {
      "0":0.01, "1":0.01, "2":0.01, "3":0.01,"4":0.01,"5":0.01,"6":0.01,"7":0.01,"8":0.01,"9":0.01,"10":0.01,"11":0.01,"12":0.01,"13":0.01,"14":0.01,"15":0.01,"16":0.01,"17":0.01,"18":0.01,"19":0.01,"20":0.01,"21":0.01,"22":0.01,"23":0.01,"24":0.01,"25":0.01,"26":0.01,"27":0.01,"28":0.01,"29":0.01,"30":0.01,"31":0.01,"32":0.01,"33":0.01,"34":0.01,"35":0.01,"36":0.01,"37":0.01,"38":0.01,"39":0.01,"40":0.01,"50":0.01,"51":0.01,"52":0.01,"53":0.01,"54":0.01,"55":0.01,"56":0.01,"57":0.01,"58":0.01,"59":0.01,"60":0.01,"61":0.01,"62":0.01,"63":0.01,"64":0.01,"65":0.01,"66":0.01,"67":0.01,"68":0.01,"69":0.01,"70":0.01,"71":0.01,"72":0.01,"73":0.01,"74":0.01,"75":0.01,"76":0.01,"77":0.01,"78":0.01,"79":0.01,"80":0.01,"81":0.01,"82":0.01,"83":0.01,"84":0.01,"85":0.01,"86":0.01,"87":0.01,"88":0.01,"89":0.01,"90":0.01,"91":0.01,"92":0.01,"93":0.01,"94":0.01,"95":0.01,"96":0.01,"97":0.01,"98":0.01,"99":0.01,"100":0.01,"667":0.005,"**ထ**":0.005
    };
    
    var sum = 0;
    for(let j in set){
        sum += set[j];
    }
    
    texte = pick_random()
    coeurr = heart()
    
    
    function heart() {
      if (texte <= 25) {
        return "💔"
      } else if (texte <= 50) {
        return "💙"
      } else if (texte == 69) {
        return ":smirk: "
      } else if (texte <= 70) {
        return "❤"
      } else if (texte <= 99) {
        return "💖"
      } else if (texte == 100) {
        return "💘"
      } else if (texte == 667) {
        return "__**EKIP**__"
      } else if (texte == "**ထ**") {
        return "💞"
      }
    }
    
    
    function pick_random(){
      var pick = Math.random()*sum;
      for(let j in set){
        pick -= set[j];
        if(pick <= 0){
          return j;
        }
      }
    }
    
    M1 =args[0]
    M2 =args[1]

    const embed = new MessageEmbed()
    .setTitle('Love Calc')
    .setDescription(`${M1} + ${M2} = ${texte}% ${coeurr}`)
    message.channel.send({ content: ' ', embeds: [embed]})

  }
};
