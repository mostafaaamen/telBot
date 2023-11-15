require("dotenv").config()

// const Telegraf = require("telegraf")
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')

const bot = new Telegraf(process.env.TOKEN)



// bot.hears("azmos", (ctx) => {
//     ctx.reply("username")
// })

// bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
// bot.on(message('text'), (ctx) => ctx.reply('this is text'))
bot.mention("AzmosDevPenetration_bot", (ctx) => {
    ctx.reply("this the new msg @AzmosDevPenetration_bot call")
})
bot.phone("+01", (ctx) => {
    ctx.reply("@AzmosDevPenetration_bot call")
})
bot.use((ctx) => {
    ctx.reply("helllo")
})
// send msg when click the /start
// bot.start((ctx) => {
//     console.log(ctx)
//     // ctx.reply("selat dataing")
// })

// bot.command("halo", (ctx) => {
//     ctx.reply("this is test ")
// }
// )
// // send msg when click the /help
// bot.help((ctx) => {
//     ctx.reply("bot help")
// })
// // send msg when click the /settings
// bot.settings((ctx) => {
//     ctx.reply("bot settings")
// })

bot.launch()
