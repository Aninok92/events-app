import { connectDB, insertDocyment } from '../../../helpers/db-util'
import { errorResponse } from '../../../helpers/error-response-utils'

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      errorResponse(res, 422, 'Invalid email adress')
      return
    }

    let client
    const newEmail = { email: email }
    try {
      client = await connectDB()
    } catch (err) {
      errorResponse(res, 500, 'Connecting to database failed')
      return
    }

    let result

    try {
      result = await insertDocyment(client, 'events', 'newsletter', newEmail)
      client.close()
    } catch (err) {
      errorResponse(res)
      return
    }

    newEmail.id = result.insertedId
    res.status(201).json({ message: 'Success', email: newEmail })
  }
}

export default handler
