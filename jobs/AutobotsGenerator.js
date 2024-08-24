import { API_PORT } from "../config.js"
import { users } from "../jsonplaceholderData/users.js"
import { AutoBot } from "../models/AutoBot.js"
import { AutobotsStorage } from "../storage/AutobotsStorage.js"
import { PostsGenerator } from "./PostsGenerator.js"
import http from "http";

const NUMBER_OF_BOTS_TO_BUILD = Number(process.env.botsgencount) || 500
const autobotsStore = new AutobotsStorage()

export class AutoBotsGenerator {
    constructor() {}

    async generate() {
        let currentCount = await autobotsStore.count()
        let targetCount = NUMBER_OF_BOTS_TO_BUILD + currentCount
        let maxExistingUsersCount = users.length
        for (let id = currentCount + 1; id <= targetCount; id++) {
            let newAutoBot = null
            let autobotId = -1
            if (id <= maxExistingUsersCount) {
                let user = users[id - 1]
                newAutoBot = new AutoBot(user.name, user.username, user.email)
                autobotId = id
            } else {
                let randomBot = this.createRandomBot()
                newAutoBot = new AutoBot(randomBot.name, randomBot.username, randomBot.email)
                let newId = currentCount + 1
                autobotId = newId
            }
            currentCount++
            await newAutoBot.save()
            this.generatePosts(autobotId)
            this.updateApi(currentCount)
        }
    }

    createRandomBot() {
        let bot = {}
        bot.name = this.makeRandomName()
        let [firstName, lastName] = bot.name.split(" ")
        bot.username = firstName
        bot.email = `${firstName}.${lastName}@mymail.com`
        return bot
    }

    async generatePosts(autobotId) {
        let postGen = new PostsGenerator(autobotId)
        await postGen.generate()
    }

    async updateApi(count) {
        console.log(`bot with id ${count} generated`)
        let url = `http://localhost:${API_PORT}/updateclient/${count}`
        http.get(url)
    }

    makeRandomName() {
        let consonants = "bcdfghjklmnpqrstvwxyz"
        let vowels = "aeiou"

        let maxNameLen = 10
        let minNameLen = 2
        let charTypeArr = [consonants, vowels]
        let firstNameLen = Math.max(Math.round(Math.random() * maxNameLen), minNameLen)
        let lastNameLen = Math.max(Math.round(Math.random() * maxNameLen), minNameLen)

        let typeOfCharSelectedIndexHistory = []

        function getNextChar() {
            let typeOfCharSelectedIndex = Math.floor(Math.random() * charTypeArr.length)

            let historyLen = typeOfCharSelectedIndexHistory.length
            if (historyLen > 1) {
                if (typeOfCharSelectedIndexHistory[historyLen - 1] === typeOfCharSelectedIndexHistory[historyLen - 2]) {
                    typeOfCharSelectedIndex = typeOfCharSelectedIndexHistory[historyLen - 1] === 0 ? 1 : 0
                }
            }

            typeOfCharSelectedIndexHistory.push(typeOfCharSelectedIndex)
            let currentCharType = charTypeArr[typeOfCharSelectedIndex]
            let nextChar = currentCharType[Math.floor(Math.random() * currentCharType.length)]
            return nextChar
        }

        let firstName = ""
        for (let i = 0; i < firstNameLen; i++) {
            firstName += getNextChar()
        }
        let lastName = ""
        typeOfCharSelectedIndexHistory = []
        for (let i = 0; i < lastNameLen; i++) {
            lastName += getNextChar()
        }

        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }

        firstName = capitalize(firstName)
        lastName = capitalize(lastName)

        return `${firstName} ${lastName}`
    }
}