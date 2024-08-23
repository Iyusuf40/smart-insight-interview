import { CommentsStorage } from "../storage/CommentsStorage.js";


export class Comment {
    static store = new CommentsStorage()
    constructor(name, email, body, postId) {
        this.name = name
        this.email = email
        this.body = body
        this.postId = postId
    }

    async save() {
        await Comment.store.insert(this)
    }

    async count() {
        return Comment.store.count()
    }
}