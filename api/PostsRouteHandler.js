import { PostsStorage } from "../storage/PostsStorage.js";

const storage = new PostsStorage();

class PostsRouteHandler {
  static async getPosts(req, res) {
    try {
      const pageLimit = 10
      const limit = req.query.limit || 10;
      const page = req.query.page || 1;
      let offset = (page - 1) * pageLimit
      let autobotId = req.query.autobotId
      let posts = []
      if (autobotId) {
        posts = await storage.select(
            ["id", "title", "body", "autobotId"],
            "autobotId = :autobotId", 
            {autobotId}, limit
          )
      } else {
        posts = await storage.select(
            ["id", "title", "body", "autobotId"],
            "id > :offset", 
            {offset}, limit
          )
      }
      
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching posts" });
    }
  }

  static async getPostById(req, res) {
    try {
      const id = req.params.id;
      const post = await storage.get(["id", "title", "body", "autobotId"], "id = :id", { id });
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

export default PostsRouteHandler