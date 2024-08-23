import { Router } from "express";
import AutoBotsRouteHandler from "./AutoBotsRouteHandler.js";
import PostsRouteHandler from "./PostsRouteHandler.js";
import CommentsRouteHandler from "./CommentsRouteHandler.js"

const router = Router()

router.get("/", (req, res) => {
    res.status(200).send("hello smartInsight\n")
})

router.get("/autobots", AutoBotsRouteHandler.getAutoBots)
router.get("/autobots/:id", AutoBotsRouteHandler.getAutoBotById)

router.get("/posts", PostsRouteHandler.getPosts)
router.get("/posts/:id", PostsRouteHandler.getPostById)

router.get("/comments", CommentsRouteHandler.getComments)
router.get("/comments/:id", CommentsRouteHandler.getCommentById)

export default router