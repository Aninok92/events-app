import fs from 'fs'
import { MongoClient } from 'mongodb'
import path from 'path'

export function buildEmailPath() {
    return path.join(process.cwd(), 'email.json')
}

export function extractEmail(filePath) {
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data
}

const PASSWORD = 'k7qH3VAqsw1jJgzB';

async function connectDB() {
    const client = await MongoClient.connect(`mongodb+srv://aninok92:${PASSWORD}@cluster0.zuo7ept.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    return client
}

async function insertDocyment(client, document) {
    const db = client.db('events');

    await db.collection('newsletter').insertOne(document)
}

async function handler(req, res) {
    if(req.method === "POST") {
    const email = req.body.email

    if(!email || !email.includes('@')) {
        res.status(422).json({ message: 'Invalid email adress' })
        return;
    }

    let client
    const newEmail = { email: email }
    try {
        client = await connectDB()
    } catch(err) {
        res.status(500).json({ message: 'Connecting to database failed'})
    }

    try {
        await insertDocyment(client, newEmail)
        client.close()
    } catch(err) {
        res.status(500).json({ message: 'Inserting data failed'})
    }
   
   newEmail.id = result.insertedId 
   res.status(201).json({ message: 'Success', email: newEmail } )
}
}

export default handler