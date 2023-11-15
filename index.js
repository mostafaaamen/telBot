require("dotenv").config()
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.TOKEN)
function hasLinks(text) {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?[\w-]+=[\w-%&]*)?$/i;
    const urlRegex = /(http:\/\/|https:\/\/)\S+/gi;
    return urlPattern.test(text);
}
bot.hears(/.*/,async (ctx) => {
    const text = ctx.message.text;
    const textLength = text.length;
    let userName = ctx.message.from.username
    console.log(ctx.message.from.username)
    let permesionsUser = ["DevPenetration","DevAtacker" ]
    console.log("permesions:  ", permesionsUser.includes(userName))
    if (permesionsUser.includes(userName)) {
        return
    } else { 
        if (hasLinks(text)) {
            try {
                const chatId = ctx.message.chat.id; // Get the chat ID
                const messageId = ctx.message.message_id; // Get the ID of the message to delete
                // Delete the message using the chat ID and message ID
                await ctx.telegram.deleteMessage(chatId, messageId);
                // await ctx.telegram.deleteMessage(chatId, messageId+1);
                ctx.reply(
    `bot auto delete message have alink
    
                         from:          @${userName} 
    
                        messageId:     ${messageId}
                     ----------------------------
if you want to send importan link 
can you send to 
@DevPenetration or @DevAtacker
                    ----------------------------------------------

System Created By
             @DevPenetration
massage delete after 10s
    `)
            setTimeout(() => {
                     ctx.telegram.deleteMessage(chatId, messageId + 1);}, 10000);
            } catch (error) {
                console.error('Error deleting message:', error);
            }}}});
bot.launch()
