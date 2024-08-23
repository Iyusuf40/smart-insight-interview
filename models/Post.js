import { PostsStorage } from "../storage/PostsStorage.js"

export class Post {
    static store = new PostsStorage()
    constructor(title, body, autobotId) {
        this.title = title
        this.body = body
        this.autobotId = autobotId
    }

    async save() {
        await Post.store.insert(this)
    }

    async count() {
        return Post.store.count()
    }
}