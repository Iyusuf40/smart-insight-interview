import express from "express"
import router from "./router.js"
import { rateLimit } from "./middlewares.js"
import { API_PORT } from "../config.js"

const PORT = API_PORT
const app = express()

app.use(express.json())
app.use(rateLimit)
app.use(router)

app.listen(PORT, () => {
  console.log("server running at:", PORT)
})

export default app