import { AutobotsStorage } from "../storage/AutobotsStorage.js"

export class AutoBot {
    static store = new AutobotsStorage()
    constructor(name, username, email) {
        this.name = name
        this.username = username
        this.email = email
    }

    async save() {
        await AutoBot.store.insert(this)
    }

    async count() {
        return AutoBot.store.count()
    }
}