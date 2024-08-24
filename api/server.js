import express from "express"
import router, { wss } from "./router.js"
import { rateLimit } from "./middlewares.js"
import { API_PORT } from "../config.js"

const PORT = API_PORT
const app = express()

app.use(express.json())
app.use("/autobots", rateLimit)
app.use("/posts", rateLimit)
app.use("/comments", rateLimit)
app.use(router)

const server = app.listen(PORT, () => {
  console.log("server running at:", PORT)
})

server.on('upgrade', function upgrade(req, socket, head) {
  wss.handleUpgrade(req, socket, head, function done(ws) {
      wss.emit('connection', ws, req);
  });
});

export {server}
export default app