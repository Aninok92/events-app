import {
  connectDB,
  insertDocyment,
  getAllDocuments,
} from '../../../helpers/db-util'

async function handler(req, res) {
  const eventId = req.query.eventId
  let client
  try {
    client = await connectDB()
  } catch (err) {
    res.status(500).json({ message: 'Connecting to database failed' })
    return
  }

  if (req.method === 'POST') {
    const email = req.body.email
    const name = req.body.name
    const text = req.body.text

    if (
      !email.includes('a') ||
      !name ||
      !text ||
      !name.trim() === '' ||
      !text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' })
      return
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    }

    let result

    try {
      result = await insertDocyment(client, 'events', 'comments', newComment)
      client.close()
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' })
      return
    }

    newComment.id = result.insertedId

    res.status(201).json({ message: 'Success!', comment: newComment })
  }

  if (req.method === 'GET') {
    let result

    try {
      result = await getAllDocuments(client, 'events', 'comments', { _id: -1 }, { eventId })
      client.close()
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' })
      return
    }
    
    res.status(200).json({ comment: result })
  }
}

export default handler
