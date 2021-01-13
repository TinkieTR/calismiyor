const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.cache.find(r => r.id === "798123431999701093"); //buraya erkek rolünüzün id'sini koyun
  const misafir = message.guild.roles.cache.find(r => r.id === "798123493634867240"); //buraya misafir rolünüzün id'sini koyun.
  const log = message.guild.channels.cache.find(c => c.id === "796859103414452224"); //buraya kayıt log id koyun
  const tag = "ꐟ";
  if(!message.member.roles.cache.array().filter(r => r.id === "796766865799512094")[0]) { //buraya kayıt sorumlusu rolünün id'sini giriniz. SUNUCU AYARLARINDAN kopyalayın.
    const hata = new Discord.MessageEmbed()
    .setColor('#fff300')
    .setDescription("**Bu Komutu Kullanabilmek İçin <@&796766865799512094> Rolün Olması Lazım**")
    .setFooter('Yetkili Değilsin!')
    message.channel.send(hata)
  } else {
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) {
        const etiket = new Discord.MessageEmbed()
    .setColor('#fff300')
        .setTitle("Bir Kullanıcı Etiketi Atın.")
            .setFooter('Λ P O L L O N ❤ Volkanoloji')
    return message.channel.send(etiket)
      }
    const c = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) {
        const isim = new Discord.MessageEmbed()
    .setColor('#fff300')
      .setTitle("**Kayıt Edebilmem İçin Bir ``İsim`` Girmelisin.**")
            .setFooter('Λ P O L L O N ❤ Volkanoloji')

      return message.channel.send(isim)
      }
            if(!yas) {
        const isim = new Discord.MessageEmbed()
    .setColor('#fff300')
      .setTitle("**Kayıt Edebilmem İçin Bir ``Yaş`` Girmelisin.**")
            .setFooter('Λ P O L L O N ❤ Volkanoloji')

      return message.channel.send(isim)
      }
    c.roles.add(kayıtlı)
    c.roles.remove(misafir)
    c.setNickname(`${tag} ${nick} | ${yas}`)

db.add(`erkekpuan_${message.author.id}`, 1)
     const apollon = new Discord.MessageEmbed()
    .setColor('#fff300')
    .setDescription(`
<a:tmdir:778774341357797378> Kayıt Başarılı İle Yapıldı Bilgileri;

ꐟ • Kaydı Yapılan Üye: **${c.user.tag}**
ꐟ • Kaydı Yapılan Üye ID: **${c.user.id}**
ꐟ • Değiştirilen İsim: **${tag} ${nick} | ${yas}**
ꐟ • Verilen Rol: **${kayıtlı}**
ꐟ • Alınan Rol: **${misafir}**
`)
    .setFooter('Λ P O L L O N ❤ Volkanoloji')
     message.channel.send(apollon)
     
 
const erkek = db.get(`erkekpuan_${message.author.id}`)
const kız = db.get(`kızpuan_${message.author.id}`)
let toplam = erkek+kız
    //loga mesaj
    const pink = new Discord.MessageEmbed()
    .setColor('#fff300')
    .setDescription(`
**Bir Erkek Üye Kayıt Oldu! Aşağıda Bilgiler Yazmakta.**

• Kaydı Yapılan Üye: **${c.user.tag}**
• Değiştirilen İsim: ${tag} ${nick} | ${yas}

**Rol Bilgileri Aşağıda Yazmakta.**

• Verilen Rol: ${kayıtlı}
• Alınan Rol: ${misafir}

**Kayıt Eden Bilgileri Aşağıda Yazmakta.**

• Kaydı Yapan Yetkili: **${message.author.tag}**
• Yetkili Toplam Kayıt Sayısı : **${toplam}**

`)
    .setFooter('Λ P O L L O N ❤ Volkanoloji')
   
    log.send(pink)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e","bay"],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "",
  usage: ""
};
   