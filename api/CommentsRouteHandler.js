import { CommentsStorage } from "../storage/CommentsStorage.js";

const storage = new CommentsStorage();

class CommentsRouteHandler {
  static async getComments(req, res) {
    try {
      const postId = Number(req.query.postId) || -1;
      const comments = await storage.select(
        ["id", "name", "email", "body"],
        "postId = :postId",
        { postId }
      )
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching comments" });
    }
  }

  static async getCommentById(req, res) {
    try {
      const id = Number(req.params.id) || 0;
      const comment = await storage.get(["id", "name", "email", "body"], "id = :id", { id });
      if (!comment) {
        res.status(404).json({ message: `Comment with id ${id} not found`});
      } else {
        res.json(comment);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching comment" });
    }
  }
}

export default CommentsRouteHandler