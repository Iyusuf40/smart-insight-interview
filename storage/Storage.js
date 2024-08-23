import { USERNAME, DB_NAME, PASSWORD } from "../config.js";
import mysqlx from '@mysql/xdevapi';

export class Storage {
    static inSessionBlock = false
    #session = null
    constructor(table, user=USERNAME, password = PASSWORD, database=DB_NAME) {
        if (!table) {
            throw new Error("Storage: table name must be provided to instantiate Storage object")
        }
        this.table = table
        this.user = user
        this.database = database
        this.password = password
        this.createTable()
    }

    createTable() {
        throw new Error("Storage: createTable function must be implemented by derived classes")
    }

    async getSession() {
        if (Storage.inSessionBlock) {
            await new Promise((res) => {
                setTimeout(res, 15)
            })
            return this.getSession()
        }

        if (this.#session) return this.#session
        Storage.inSessionBlock = true
        let session = await mysqlx.getSession({
            user: this.user,
            password: this.password
        })
        Storage.inSessionBlock = false
        this.#session = session
        return session
    }

    async #getTable() {
        await this.getSession()
        const table = this.#session
            .getSchema(this.database).getTable(this.table);
        return table
    }

    async #executeStatement(statement) {

    }

    async insert(keyValuePairs) {
        const table = await this.#getTable()
        let {keys, values} = getKeysAndValuesOfObject(keyValuePairs)
        const result = await table.insert(keys)
            .values(values)
            .execute()
        return result
    }

    async closeSession() {
        if (!this.#session) return
        await this.#session.close()
    }

    async delete(whereStatement="true") {
        await this.#getTable().then(table => table.delete().where(whereStatement).execute())
    }

    async dropTable() {
        let session = await this.getSession()
        await this.delete()
        await session.sql("set foreign_key_checks = 0").execute()
        await session.sql(`drop table if exists ${this.database}.${this.table}`).execute()
        await session.sql("set foreign_key_checks = 1").execute()
        this.constructor.tableCreated = false
    }

    /**
     * 
     * @param {Array<string>} keys  - [age, email, name]
     * @param {string} whereStatement - e.g 'age = :v' 
     * @param {Object<string<any>>} bindWhereKeysToValues  - must correspond to bind placeholder
     * varaible in whereStatement e.g 'age = :v' must have a bindWhereKeysToValues of e,g {v: 42}
     * @returns 
     */
    async select(keys, whereStatement, bindWhereKeysToValues) {
        const table = await this.#getTable()
        const query = table.select(keys)
        if (whereStatement && bindWhereKeysToValues) {
            query.where(whereStatement).bind(bindWhereKeysToValues)
        }
        let result = await query.execute()
        let objects = []
        result.fetchAll().forEach(objectValues => {
            let object = {}
            keys.forEach((key, i) => {
                object[key] = objectValues[i]
            })
            objects.push(object)
        });
        return objects
    }

    async get(keys, whereStatement, bindWhereKeysToValues) {
        const table = await this.#getTable()
        const query = table.select(keys)
        if (whereStatement && bindWhereKeysToValues) {
            query.where(whereStatement).bind(bindWhereKeysToValues)
        }
        let result = await query.execute()
        let objectValues = result.fetchOne()
        let object = {}
        keys.forEach((key, i) => {
            object[key] = objectValues[i]
        })
        return object
    }

    async count() {
        const table = await this.#getTable()
        let c = await table.count()
        return c
    }
}

function getKeysAndValuesOfObject(obj) {
    let keys = []
    let values = []

    for (let key in obj) {
        keys.push(key)
        values.push(obj[key])
    }

    return {keys, values}
}