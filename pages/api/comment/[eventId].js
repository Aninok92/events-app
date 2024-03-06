import { MongoClient } from 'mongodb'

const PASSWORD = 'k7qH3VAqsw1jJgzB';

async function handler(req, res) {
    const eventId = req.query.comment

    const client = await MongoClient.connect(`mongodb+srv://aninok92:${PASSWORD}@cluster0.zuo7ept.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

    if (req.method === 'POST') {
        const email = req.body.email
        const name = req.body.name
        const text = req.body.text

        if(!email.includes('a') || !name || !text || !name.trim() === '' || !text.trim() === '') {
            res.status(422).json({ message: 'Invalid input'})
            return
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        const db = client.db('events');

        const result = await db.collection('comments').insertOne(newComment)

        newComment.id = result.insertedId 

        client.close()
        res.status(201).json({ message: 'Success!', comment: newComment });
    } 
    const db = client.db('events');

    const documents = await db.collection('comments').find().sort({_id: -1}).toArray()
    res.status(200).json({comment: documents})
}

export default handler