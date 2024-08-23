import { users } from "../jsonplaceholderData/users.js"
import { AutoBot } from "../models/AutoBot.js"
import { AutobotsStorage } from "../storage/AutobotsStorage.js"

const NUMBER_OF_BOTS_TO_BUILD = 500
const autobotsStore = new AutobotsStorage()

export class AutoBotsGenerator {
    constructor() {}

    async generate() {
        let currentCount = await autobotsStore.count()
        let maxExistingUsersCount = users.length
        for (let id = currentCount + 1; id <= NUMBER_OF_BOTS_TO_BUILD + currentCount; id++) {
            let newAutoBot = null
            if (id <= maxExistingUsersCount) {
                let user = users[id - 1]
                newAutoBot = new AutoBot(user.name, user.username, user.email)
                await this.generatePosts(id)
            } else {
                let prevCorrespondingID = currentCount + 1 - maxExistingUsersCount
                let user = await autobotsStore.get(
                    ["name", "username", "email"],
                    "id = :id",
                    {id: prevCorrespondingID}
                )
                this.scrambleUserDetails(user)
                newAutoBot = new AutoBot(user.name, user.username, user.email)
                let newId = currentCount + 1
                await this.generatePosts(newId)
            }
            currentCount++
            await newAutoBot.save()
            await this.updateApi(currentCount)
        }
    }

    scrambleUserDetails(user) {
        user.name = `${user.name[0].toUpperCase()}. ${user.name}`
        user.username = `${user.name[0].toUpperCase()}.${user.username}`
        user.email = `${user.name[0].toUpperCase()}.${user.email}`
    }

    async generatePosts(id) {

    }

    async updateApi(currentCount) {
        console.log(`bot with id ${currentCount} generated`)
    }
}