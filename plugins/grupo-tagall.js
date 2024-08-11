let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
let pesan = args.join` `
let oi = `👸🏻@𝕮𝖊𝖔𝕲𝖊𝖗𝖎𝕻𝖎𝖚𝖒.𝕯𝖟𝖓 ${pesan}`
let teks = `*🙂‍↕𝙈𝙞𝙘𝙝𝙞 𝙩𝙚 𝙞𝙣𝙫𝙤𝙘𝙖 𝙢𝙖𝙡𝙖𝙮𝙖🙂‍↔*\n𝘔𝘪𝘤𝘩𝘪𝘉𝘰𝘵🥇\n${oi}\n\n*🥥𝙈𝙚𝙣𝙘𝙞𝙤𝙣𝙚𝙨*\n`
for (let mem of participants) {
teks += `🍪🥛ᯓ @${mem.id.split('@')[0]}\n`}
teks += `MichiBot`
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )  
}
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
