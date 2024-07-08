import { Db, MongoClient } from 'mongodb'

let mongoClient: MongoClient

const initClient = async (): Promise<void> => {
    console.log('Connecting to Mongo...')

    try {
        mongoClient = await MongoClient.connect("mongodb://localhost:27017")
    } catch (e: any) {
        throw new Error(e)
    }
}

const closeClient = async (): Promise<void> => {
    if (!mongoClient) {
        return
    }

    await mongoClient.close()
}

const getDb = async (): Promise<Db> => {
    if (!mongoClient) {
        await initClient()
    }

    return mongoClient.db("test")
}

export const mongoConnection = {
    initClient,
    closeClient,
    getDb
}
