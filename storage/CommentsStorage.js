import { Storage } from "./Storage.js";

export class CommentsStorage extends Storage {
    static tableCreated = false
    constructor(table="comments") {
        super(table)
    }

    async createTable() {
        if (CommentsStorage.tableCreated) return
        let session = await this.getSession()
        await session.sql(`CREATE TABLE IF NOT EXISTS ${this.database}.${this.table} ( \
                            id INT PRIMARY KEY AUTO_INCREMENT, \
                            name VARCHAR(255) NOT NULL, \
                            email VARCHAR(255) NOT NULL, \
                            body TEXT NOT NULL, \
                            postId INT NOT NULL, \
                            FOREIGN KEY (postId) REFERENCES posts(id) \
                            ON DELETE CASCADE \
                        );`).execute()
        CommentsStorage.tableCreated = true
    }
}