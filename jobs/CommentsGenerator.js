import { comments } from "../jsonplaceholderData/comments.js"
import { CommentsStorage } from "../storage/CommentsStorage.js"
import { Comment } from "../models/Comment.js"
import { getRandomText } from "./PostsGenerator.js"

const NUMBER_OF_COMMENTS_TO_MAKE = 10
const commentsStore = new CommentsStorage()
export class CommentsGenerator {

    static startingCountOffsetForCurrentGeneration = 0
    static lockGetCurrentCount = false

    constructor(postId) {
        this.postId = postId
    }

    getLock() {
        CommentsGenerator.lockGetCurrentCount = true
    }

    releaseLock() {
        CommentsGenerator.lockGetCurrentCount = false
    }

    isLocked() {
        return CommentsGenerator.lockGetCurrentCount
    }

    async getStartingCountOffsetForCurrentGeneration() {
        if (this.isLocked()) {
            await new Promise(res => setTimeout(res, 20))
            return this.getStartingCountOffsetForCurrentGeneration()
        }
        this.getLock()
        let dbCount = await commentsStore.count()
        if (CommentsGenerator.startingCountOffsetForCurrentGeneration < dbCount) {
            CommentsGenerator.startingCountOffsetForCurrentGeneration = dbCount
        }
        let currentStartingCountOffsetForCurrentGeneration = CommentsGenerator.startingCountOffsetForCurrentGeneration
        CommentsGenerator.startingCountOffsetForCurrentGeneration += NUMBER_OF_COMMENTS_TO_MAKE
        this.releaseLock()
        return currentStartingCountOffsetForCurrentGeneration
    }

    async generate() {
        let currentCount = await this.getStartingCountOffsetForCurrentGeneration()
        let targetCount = NUMBER_OF_COMMENTS_TO_MAKE + currentCount
        let maxExistingCommentsCount = comments.length

        let awaitableOps = []
        for (let id = currentCount + 1; id <= targetCount; id++) {
            let newComment = null
            if (id <= maxExistingCommentsCount) {
                let comment = comments[id - 1]
                newComment = new Comment(comment.name, comment.email, comment.body, this.postId)
            } else {
                let randomPost = this.getRandomComment()
                newComment = new Comment(randomPost.name, randomPost.email, randomPost.body, this.postId)
            }
            currentCount++
            awaitableOps.push(newComment.save())
        }
        await Promise.all(awaitableOps)
    }

    getRandomComment() {
        let maxBodyCharsLen = 60
        let minBodyCharsLen = 20

        let name = this.getRandomName()
        let email = this.getRandomEmail(name)

        let body = getRandomText(minBodyCharsLen, maxBodyCharsLen, true)

        let comment = {name, email, body}
        return comment
    }

    getRandomName() {
        let firstName = getRandomText(3, 10, false, false)
        let lastName = getRandomText(3, 10, false, false)
        return `${firstName} ${lastName}`
    }

    getRandomEmail(name) {
        return `${name.split(" ").join(".")}.mail.com`
    }
}