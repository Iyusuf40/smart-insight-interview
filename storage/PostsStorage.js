import { Storage } from "./Storage.js";

export class PostsStorage extends Storage {
    static tableCreated = false
    constructor(table="posts") {
        super(table)
    }

    async createTable() {
        if (PostsStorage.tableCreated) return
        let session = await this.getSession()
        await session.sql(`CREATE TABLE IF NOT EXISTS ${this.database}.${this.table} ( \
                                id INT PRIMARY KEY AUTO_INCREMENT, \
                                title VARCHAR(255) NOT NULL, \
                                body TEXT NOT NULL, \
                                autobotId INT NOT NULL, \
                                FOREIGN KEY (autobotId) REFERENCES autobots(id) \
                                ON DELETE CASCADE \
                        );`).execute()
        PostsStorage.tableCreated = true
    }
}