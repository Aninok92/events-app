import { MongoClient } from 'mongodb'

const PASSWORD = 'k7qH3VAqsw1jJgzB'

export async function connectDB() {
  return await MongoClient.connect(
    `mongodb+srv://aninok92:${PASSWORD}@cluster0.zuo7ept.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  )
}

export async function insertDocyment(client, dbName, collection, document) {
  const db = client.db(dbName)

  return await db.collection(collection).insertOne(document)
}

export async function getAllDocuments(
  client,
  dbName,
  collection,
  sort,
  filter = {},
) {
  const db = client.db(dbName)

  return await db.collection(collection).find(filter).sort(sort).toArray()
}
