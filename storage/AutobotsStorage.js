import { Storage } from "./Storage.js";

export class AutobotsStorage extends Storage {
    static tableCreated = false
    constructor(table="autobots") {
        super(table)
    }

    async createTable() {
        if (AutobotsStorage.tableCreated) return
        let session = await this.getSession()
        await session.sql(`CREATE TABLE IF NOT EXISTS ${this.database}.${this.table} (  \
                            id INT PRIMARY KEY AUTO_INCREMENT,    \
                            name VARCHAR(255) NOT NULL,   \
                            username VARCHAR(255) NOT NULL,   \
                            email VARCHAR(255) NOT NULL   \
                        );`).execute()
        AutobotsStorage.tableCreated = true
    }
}