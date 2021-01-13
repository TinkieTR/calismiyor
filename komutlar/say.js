const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    let erkekRolü = "798123431999701093";
  let kızRolü = "798123450647445551";
  let ekipRolü = "796767298048098304"; 
 
  console.log(message.guild.roles.cache)
  let guild = message.guild; 
  for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let tag = "ꐟ"
    const pinkcode = new Discord.MessageEmbed()
            .setTitle(` ${message.author.tag} - **Tarafından istendi**.`)
        .setColor('#fff300')
    .setDescription(`
\`\`\` tag Yazarak tagımızı alabilirsin. \`\`\`

**<a:tadaa:778787257057804369> Toplam Üye: \`\`${message.guild.memberCount}\`\`**

**<a:sasa:778787940741677088> Aktif Üye: \`\`${message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}\`\`**

**<a:kral:778787824018653205> Tagda Bulunan Üyeler: \`\`${message.guild.members.cache.filter(m => m.user.username.includes(tag)).size}\`\`**

**<:ses:781291515753398293> Seslide Bulunan Üye Sayısı: \`\`${count}\`\`**

**<a:boost:781294320379887616> Sunucunun Boost Sayısı: \`\`${message.guild.premiumSubscriptionCount}\`\`**

**<a:syes6:724744149693235213> Sunucudaki Erkek Üye Sayısı: \`\`${message.guild.roles.cache.get(erkekRolü).members.size}\`\`**

**<a:syes9:751896793603899392> Sunucudaki Kız Üye Sayısı: \`\`${message.guild.roles.cache.get(kızRolü).members.size}\`\`**

\`\`\` \`\`\`
`)
            .setFooter('Λ P O L L O N ❤ Volkanoloji')
        .setThumbnail(`https://cdn.discordapp.com/attachments/655459488236568597/655887650494087178/loading_1.gif`)
    message.channel.send(pinkcode);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayy'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
}