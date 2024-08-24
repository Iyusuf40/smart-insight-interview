import { Router } from "express";
import AutoBotsRouteHandler from "./AutoBotsRouteHandler.js";
import PostsRouteHandler from "./PostsRouteHandler.js";
import CommentsRouteHandler from "./CommentsRouteHandler.js"
import { WebSocketServer } from "ws";
import { AutobotsStorage } from "../storage/AutobotsStorage.js";

const router = Router()
const wss = new WebSocketServer({noServer: true})

router.get("/", (req, res) => {
    res.status(200).send("hello smartInsight\n")
})

router.get("/autobots", AutoBotsRouteHandler.getAutoBots)
router.get("/autobots/:id", AutoBotsRouteHandler.getAutoBotById)

router.get("/posts", PostsRouteHandler.getPosts)
router.get("/posts/:id", PostsRouteHandler.getPostById)

router.get("/comments", CommentsRouteHandler.getComments)
router.get("/comments/:id", CommentsRouteHandler.getCommentById)

router.get("/updateclient/:count", (req, res) => {
    const count = req.params.count
    wss.clients.forEach(function each(client) {
        client.send(`${count}`);
    });
    res.status(200).send("sent")
})

wss.on('connection', async (ws, req) => {
    const autobotsStore = new AutobotsStorage()
    let count = await autobotsStore.count()
    ws.send(`${count}`)
    autobotsStore.closeSession()
})

export { wss }
export default router