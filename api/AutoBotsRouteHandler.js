import { AutobotsStorage } from "../storage/AutobotsStorage.js";

const storage = new AutobotsStorage();

class AutoBotsRouteHandler {
    static async getAutoBots(req, res) {
        try {
            const pageLimit = 10
            const limit = Number(req.query.limit) || 10;
            const page = Number(req.query.page) || 1;
            let offset = (page - 1) * pageLimit
            const posts = await storage.select(
                ["id", "name", "username", "email"],
                 "id > :offset", 
                 {offset}, limit
            )
            res.json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching posts" });
        }
    }

    static async getAutoBotById(req, res) {
        try {
            const id = Number(req.params.id) || -1;
            const post = await storage.get(["id", "name", "username", "email"], "id = :id", { id });
            if (!post) {
              res.status(404).json({ message: `Post with id ${id} not found`});
            } else {
              res.json(post);
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching post" });
          }
    }
}

export default AutoBotsRouteHandler