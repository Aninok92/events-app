import {
  connectDB,
  insertDocyment,
  getAllDocuments,
} from '../../../helpers/db-util'
import { errorResponse } from '../../../helpers/error-response-utils'

async function handler(req, res) {
  const eventId = req.query.eventId
  let client
  try {
    client = await connectDB()
  } catch (err) {
    errorResponse(res, 500, 'Connecting to database failed')
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
      errorResponse(res, 422, 'Invalid input')
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
      errorResponse(res)
      return
    }

    newComment.id = result.insertedId

    res.status(201).json({ message: 'Success!', comment: newComment })
  }

  if (req.method === 'GET') {
    let result

    try {
      result = await getAllDocuments(
        client,
        'events',
        'comments',
        { _id: -1 },
        { eventId },
      )
      client.close()
    } catch (err) {
      errorResponse(res)
      return
    }

    res.status(200).json({ comment: result })
  }
}

export default handler
