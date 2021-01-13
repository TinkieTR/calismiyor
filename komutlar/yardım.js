const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async(client, message, args) => {


  
  
  
  
  const pinkcode = new Discord.MessageEmbed()
    .setColor('#fff300')
.setDescription(`
**• Moderasyon Komutları •**

**.say = Sunucunun Bilgilerini Gösterir.**
**.slowmode = Bulunduğunuz Kanalı Yavaş Moda Alır.**

**• Kayıt Komutları •**

**.erkek = Bay Üyeyi Kayıt Etmenize Yarar.**
**.kız = Bayan Üyeyi Kayıt Etmenize Yarar.**

`)
    .setFooter('Λ P O L L O N ❤ Volkanoloji')
 message.channel.send(pinkcode)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y"],
  permLevel: 0
};
exports.help = {
  name: "yardım",
  description: "",
  usage: ""
};
   