const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');


const app = express();
app.get("/", (request, response) => {
  console.log('CODE 7/24 AKTİF TUTMA İŞLEMİ BAŞARILI');
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.TOKEN);

//---------------------------------KOMUTLAR---------------------------------\\

client.on("guildMemberAdd", (member, message) => {
  if (member.guild.id !== "796431504128606228") return;//sunucunuzun id 
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kanal = "796437332437237791"; //mesajın gönderilmesi gereken kanalın id

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "**`Şüpheli`**";
  }
  if (ayyy > 1) {
    kontrol = "**`Güvenilir`**";
  }

  if (!kanal) return;

  ///////////////////////

  //let randomgif = [ 
        //     "https://media.giphy.com/media/ckTzLQGxEKwb8M2MnC/giphy.gif", "https://media.giphy.com/media/xUOwGc56tRmf0PEGM8/giphy.gif", "https://media.giphy.com/media/QCAEIr9LZDF7O/giphy.gif", "https://media.giphy.com/media/8YQwhWZYM4vg4/giphy.gif"];

  ///////////////////
  const embed = new Discord.MessageEmbed()
    .setColor('#fff300')
  //.setImage(randomgif[Math.floor(Math.random() * randomgif.length)])
  .setImage('https://i.gifer.com/HoUw.gif')


 //
            .setFooter('Λ P O L L O N ❤ Volkanoloji')
  .setDescription(`<a:sasa:778787940741677088> **Hoş geldin!** ${
        member.user
      }, \n\n<a:diamond:779701424023273523> **Seninle Beraber \`${
        member.guild.memberCount
      }\` Kişi Olduk!** \n\n <a:ayar:783796256015122454> **Kaydının Yapılması İçin \`İsim\` Ve \`Yaş\` Yazman Gerek.** \n\n <a:mavikalp:790759203165306901> **Hesap kuruluş tarihi: \`${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
       )}\`** \n\n <a:hype:778788019548454912> **Bu vatandaş:** ${kontrol} \n\n <a:hawli:778787771049443338> **<@&796766865799512094> rolündeki yetkililer sizinle ilgilenecektir.**
       `);
  //
  client.channels.cache.get(kanal).send(embed);
  client.channels.cache.get(kanal).send(`<a:hawli:778787771049443338> ||<@&796766865799512094>|| <a:hawli:778787771049443338>`);
});

client.on('message', async (msg, member, guild) => {
        if (msg.content.toLowerCase() === 'tag'){
          
        const tag = new Discord.MessageEmbed()
    .setColor('#fff300')
        .setDescription("ꐟ")
          msg.channel.send(tag)
      }
    });


client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = "ꐟ"; //tagınız
    let sunucu = "796431504128606228"; //sunucu ID
    let kanal = "797123406025850899" //log kanal id
    let rol = "796767298048098304"; //tag alınca verilcek rol id
    if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      const aldı = new Discord.MessageEmbed()
    .setColor('#fff300')
      .setTitle('Hayırlı Olsun!')
      .setDescription(`${newUser} **\`${tag}\`** Tagını Aldığı İçin <@&${rol}> Rolünü Kazandı!`)
                  .setFooter('Λ P O L L O N ❤ Volkanoloji')
      client.channels.cache.get(kanal).send(aldı)
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
    } if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
    const verdi = new Discord.MessageEmbed()
    .setColor('#fff300')
      .setTitle('Üzüldük!')
      .setDescription(`${newUser} **\`${tag}\`** Tagını Çıkardığı İçin <@&${rol}> Rolünü Kaybetti!`)
                .setFooter('Λ P O L L O N ❤ Volkanoloji')
      client.channels.cache.get(kanal).send(verdi)
    }

  }
})


client.on("ready", async function() {
const voiceChannel = "798123329822130187"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})

