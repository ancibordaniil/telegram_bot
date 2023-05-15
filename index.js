const tgApi = require("node-telegram-bot-api")
const {gameOptions, againOptions} = require('./options.cjs')

const token = "6032463147:AAEJiID-gpXV3C1GO4zYcdJavTYNf63SwIw"

const bot = new tgApi(token, {polling: true})

const chats = {}

const mainFunction = () => {

    bot.setMyCommands([
        {command: "/start", description: "Приветствие телеграмм бота и первоначальная информация о его функциях"},
        {command: "/info", description: "Присылает всю доступную про вас информацию, которая хранится в базе данных"},
        {command: "/command", description: "Выдает все доступные команды и их функции"},
        {command: "/numbers", description: "Вы должны угадать число от 1 до 9, которое загадал Бот"}
    ])

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id
        const text = msg.text

        if (text === "/start") {
            return await bot.sendMessage(chatId,
                `Здравствуйте ${msg.from.username}, добро пожаловать в телеграмм бот ulvenn Bot.` + '\n' + '\n' +
                "Команды:" + '\n' + "/info - Присылает всю доступную про вас информацию, которая хранится в базе данных"
                + '\n' + "/command - Выдает все доступные команды и их функции" + '\n' +
                '/numbers - Игра, в которой вам предстоит отгадать число от 0 до 9'
            )
        }
        if (text === "/info") {
            return await bot.sendMessage(chatId,
                `Ваше полное имя: ${msg.from.first_name} ${msg.from.last_name}` + '\n' +
                `Username: ${msg.chat.username}` + "\n"
            )
        }
        if (text === "/command") {
            return await bot.sendMessage(chatId,
                "/start - Приветствие телеграмм бота и первоначальная информация о его функциях" + '\n' +
                "/info - Присылает всю доступную про вас информацию, которая хранится в базе данных" + '\n' +
                "/command - Выдает все доступные команды и их функции" + '\n' +
                '/numbers - Игра, в которой вам предстоит отгадать число от 0 до 9'
            )
        } if (text === "/numbers") {
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber
            return await bot.sendMessage(chatId,"Отгадайте число от 0 до 9", gameOptions)
        }

    })

    bot.on("callback_query", async (msg) => {
        const data = msg.data
        const chatId = msg.message.chat.id

        if (data === chats[chatId]) {
            bot.sendMessage(chatId, `Правильно! Бот загадал число ${chats[chatId]}`, againOptions)
        } if (data === "/again") {
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber
            return await bot.sendMessage(chatId,"Отгадайте число от 1 до 9", gameOptions)
        } else {
            bot.sendMessage(chatId, `Неправильно! Бот загадал число ${chats[chatId]}`, againOptions)
        }
    })
}

mainFunction()