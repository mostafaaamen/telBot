require("dotenv").config()
const { Telegraf } = require('telegraf')
const express = require("express")
const axios =require("axios")
const app = express()
const bot = new Telegraf(process.env.TOKEN)
function hasLinks(text) {
    let res = []
    const linkRegex = /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?/gi;
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?[\w-]+=[\w-%&]*)?$/i;
    res.push(urlPattern.test(text))
    res.push(linkRegex.test(text))
    return res
}
let html = `
This Bot Allow To Delete New Chat Have alink

/link   : Show All Links You Need It
`
bot.start((ctx) => {
    const htmlText = '<b>Hello</b>, <i>Telegram</i>!';
    ctx.reply(html, { parse_mode: 'HTML' });
});


bot.command("link", (ctx) => {
    let html = `
    ----------------------------------
        <a href="http://books.sadat.online/">المنصة</a>

        <a href="http://stu.usc.edu.eg"> ابن الهيثم </a>

        <a href="https://t.me/DwratTrbiaAskria">  التربية العسكرية </a>

        <a href="https://forms.gle/h2QPrJ5juFCDvXnd8">تسجيل مهارات التوظيف</a>

        <a href="https://maps.app.goo.gl/UVBJix35uXkf7RwR6">مكان مهارات التوظيف علي جوجل </a>

    ----------------------------------
    الكتب و المذكرات

<b>الفرقة الرابعة</b> :

    <b>كتب الترم الاول</b>    : <a href="https://t.me/AzmosBooks/11301">اضعط</a>

    <b>مذكرات الترم الاول</b> : <a href="https://t.me/AzmosBooks/11455">اضعط</a>

<b>الثالثة </b> :
    
    <b>كتب الترم الاول</b>    : <a href="https://t.me/AzmosBooks/4903">اضعط</a>
    
    <b>مذكرات الترم الاول</b>: <a href="https://t.me/AzmosBooks/5319">اضعط</a>


    <b>كتب الترم الثاني</b>    : <a href="https://t.me/AzmosBooks/7163">اضعط</a>
    
    <b>مذكرات الترم الثاني</b>: <a href="https://t.me/AzmosBooks/7535">اضعط</a>

<b>الثانية </b> :

    <b>كتب الترم الاول</b>    : <a href="https://t.me/AzmosBooks/72">اضعط</a>

    
    <b>كتب الترم الثاني</b>    : <a href="https://t.me/AzmosBooks/1469">اضعط</a>
    

    ────────────────────
   <b>Created By : </b> @DevPenetration
    ────────────────────
    this remover after 10s
    ────────────────────`
    const text = ctx.message.text;
    console.log(ctx.message.from.username)
    const chatId = ctx.message.chat.id; // Get the chat ID
    const messageId = ctx.message.message_id;
    ctx.reply(html, { parse_mode: "HTML", disable_web_page_preview: true })
    setTimeout(() => { 
        ctx.telegram.deleteMessage(chatId, messageId)
        ctx.telegram.deleteMessage(chatId, messageId + 1)
    },10000)
})
bot.command("test", (ctx) => {
    const centeredText =
        'Hello,\n\n' +
        'Here is a way to create the illusion of centered text on Telegram.\n' +
        '────────────────────\n\n' + // Create a horizontal line for visual separation
        'Centered Text\n\n' +
        '────────────────────\n\n' + // Create another horizontal line
        'This text appears centered!';

    ctx.reply(centeredText);
})

bot.hears(/.*/,async (ctx) => {
    const text = ctx.message.text;
    let userName = ctx.message.from.username
    console.log(ctx.message.from.username)
    let permesionsUser = ["DevPenetration" ]
    console.log("permesions:  ", permesionsUser.includes(userName))
    console.log(hasLinks(text).includes(true))
    if (permesionsUser.includes(userName)) {
        return
    } else { 
        if (hasLinks(text).includes(true)) {
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
@DevPenetration
_____________________________________
System Created By <a href="te.me/azmos-book">Group</a>
@DevPenetration
massage delete after 10s
_____________________________________
    `,{parse_mode:"HTML"})
            setTimeout(() => {
                     ctx.telegram.deleteMessage(chatId, messageId + 1);}, 10000);
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
    }
});
            
bot.launch()

app.get("/", (req, res) => {
    res.json({"server":"ok"})
})

let PORT = process.env.PORT || 3002
setInterval(() => {
    axios.get("https://azmos-telbot.onrender.com")
    .then(function (response) {
        // Handle successful response
        console.log('Response:', response.data);
    })
    .catch(function (error) {
        // Handle error
        console.error('Error:', error);
    })
}, 5000);
app.listen(PORT,()=>console.log(`server running on ${PORT}`))



