const tgApi = require("node-telegram-bot-api")

const token = "6032463147:AAEJiID-gpXV3C1GO4zYcdJavTYNf63SwIw"
const bot = new tgApi(token, {polling: true})

bot.on('message', (msg) => {
    const baseInfo = msg
    const chatId = msg.chat.id
    const text = msg.text

    if(text === "/start") {
        bot.sendMessage(chatId,
                `Здравствуйте ${msg.from.username}, добро пожаловать в телеграмм бот ulvenn Bot.` + '\n' + '\n' +
                "Команды:" + '\n' +"/info - Присылает всю доступную про вас информацию, которая хранится в базе данных"
                + '\n' + "/command - Выдает все доступные команды и их функции"
        )
    } if (text === "/info") {
        bot.sendMessage(chatId,
            `Ваше полное имя: ${msg.from.first_name} ${msg.from.last_name}` + '\n' +
            `Username: ${msg.chat.username}` + "\n"
        )
    } if (text === "/command") {
        bot.sendMessage(chatId,
            "/start - Приветствие телеграмм бота и первоначальная информация о его функциях" + '\n' +
            "/info - Присылает всю доступную про вас информацию, которая хранится в базе данных" + '\n' +
            "/command - Выдает все доступные команды и их функции"
        )
    }
})