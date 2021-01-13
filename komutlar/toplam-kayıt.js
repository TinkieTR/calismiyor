const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {//splashen
  let kişi = message.mentions.users.first() || message.member
  let erkek = db.get(`erkekpuan_${message.author.id}`);
  let kız = db.get(`kızpuan_${message.author.id}`);
let toplam = erkek+kız
var embed = new Discord.MessageEmbed()
.setThumbnail(message.author.displayAvatarURL({dynamic : true}))
    .setColor('#fff300')
.setFooter('Λ P O L L O N ❤ Volkanoloji')
.setDescription(`
●▬▬▬ <a:hkalp:781708345480183839> **Kayıt İstatistikleri** <a:hkalp:781708345480183839> ▬▬▬●

           > <a:ayar:783796256015122454>     • \`Yetkili\` • **${kişi}**
           > <a:ayar:783796256015122454>     • \`Toplam Üye Kayıt Sayısı\` • **${toplam}**
           > <a:ayar:783796256015122454>     • \`Toplam Erkek Kayıt Sayısı\` • **${erkek}**
           > <a:ayar:783796256015122454>     • \`Toplam Kadın Kayıt Sayısı\` • **${kız}**
              
●▬▬▬ <a:hkalp:781708345480183839> **Kayıt  İstatistikleri** <a:hkalp:781708345480183839> ▬▬▬●




`)
message.reply(embed)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'toplam-kayıt'
};