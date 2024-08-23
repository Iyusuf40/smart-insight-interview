import { posts } from "../jsonplaceholderData/posts.js"
import { Post } from "../models/Post.js"
import { PostsStorage } from "../storage/PostsStorage.js"
import { CommentsGenerator } from "./CommentsGenerator.js"

const NUMBER_OF_POSTS_TO_MAKE = 10
const postsStore = new PostsStorage()

export class PostsGenerator {

    static startingCountOffsetForCurrentGeneration = 0
    static lockGetCurrentCount = false

    constructor(autobotId) {
        this.autobotId = autobotId
    }

    getLock() {
        PostsGenerator.lockGetCurrentCount = true
    }

    releaseLock() {
        PostsGenerator.lockGetCurrentCount = false
    }

    isLocked() {
        return PostsGenerator.lockGetCurrentCount
    }

    async getStartingCountOffsetForCurrentGeneration() {
        if (this.isLocked()) {
            await new Promise(res => setTimeout(res, 20))
            return this.getStartingCountOffsetForCurrentGeneration()
        }
        this.getLock()
        let dbCount = await postsStore.count()
        if (PostsGenerator.startingCountOffsetForCurrentGeneration < dbCount) {
            PostsGenerator.startingCountOffsetForCurrentGeneration = dbCount
        }
        let currentStartingCountOffsetForCurrentGeneration = PostsGenerator.startingCountOffsetForCurrentGeneration
        PostsGenerator.startingCountOffsetForCurrentGeneration += NUMBER_OF_POSTS_TO_MAKE
        this.releaseLock()
        return currentStartingCountOffsetForCurrentGeneration
    }

    async generate() {
        let currentCount = await this.getStartingCountOffsetForCurrentGeneration()
        let targetCount = NUMBER_OF_POSTS_TO_MAKE + currentCount
        let maxExistingPostsCount = posts.length

        let awaitableOpsForPosts = []
        let awaitableOpsForComments = []
        for (let id = currentCount + 1; id <= targetCount; id++) {
            let newPost = null
            let postId = -1
            if (id <= maxExistingPostsCount) {
                let post = posts[id - 1]
                newPost = new Post(post.title, post.body, this.autobotId)
                postId = id
            } else {
                let randomPost = this.getRandomPost()
                newPost = new Post(randomPost.title, randomPost.body, this.autobotId)
                let newId = currentCount + 1
                postId = newId
            }
            currentCount++
            awaitableOpsForPosts.push(newPost.save())
            awaitableOpsForComments.push(this.generateComments(postId))
        }
        await Promise.all(awaitableOpsForPosts)
        await Promise.all(awaitableOpsForComments)
    }

    async generateComments(postId) {
        let commentGen = new CommentsGenerator(postId)
        await commentGen.generate()
    }

    getRandomPost() {
        let maxBodyCharsLen = 100
        let minBodyCharsLen = 30
        let maxTitleCharsLen = 30
        let minTitleCharsLen = 15

        let title = getRandomText(minTitleCharsLen, maxTitleCharsLen, false)
        let body = getRandomText(minBodyCharsLen, maxBodyCharsLen, true)

        let post = {title, body}
        return post
    }
}

export function getRandomText(mincharsLen, maxCharsLen, usePunctuations=true, useSpace=true) {
    let consonants = "bcdfghjklmnpqrstvwxyz"
    let vowels = "aeiou"

    let charTypeArr = [consonants, vowels]

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

    function capitalize(str, index) {
        if (index) {
          return str.slice(0, index) + str.charAt(index).toUpperCase() + str.slice(index + 1)
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    let minWordLen = 1
    let maxWordLen = 12

    let currentWordLen = Math.max(Math.round(Math.random() * maxWordLen), minWordLen)
    let totalCharsLen = Math.max(Math.round(Math.random() * maxCharsLen), mincharsLen)

    let punctuations = [".", ",", "!"]
    let word = ""
    let words = []
    for (let i = 0; i < totalCharsLen; i++) {
        word += getNextChar()

        if (!useSpace) {
            if (i === totalCharsLen - 1) words.push(word)
            continue
        }

        if (word.length === currentWordLen) {
            words.push(word)
            word = ""
            if (words.length % 2 === 0 && Math.random() > 0.7 && usePunctuations) {
                words.push(punctuations[Math.floor(Math.random() * punctuations.length)])
            }
            typeOfCharSelectedIndexHistory = []
            currentWordLen = Math.max(Math.round(Math.random() * maxWordLen), minWordLen)
        }
    }

    let text = words.join(" ")
    text = text.replace(" .", ".").replace(" ,", ",")
    if (text.includes(".")) {
        text = text.split(".").map(sentence => capitalize(sentence, 1)).join(".")
    }

    return text
}