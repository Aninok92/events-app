import fs from 'fs'
import path from 'path'
import { connectDB, insertDocyment } from '../../../helpers/db-util'

export function buildEmailPath() {
  return path.join(process.cwd(), 'email.json')
}

export function extractEmail(filePath) {
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData)
  return data
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email adress' })
      return
    }

    let client
    const newEmail = { email: email }
    try {
      client = await connectDB()
    } catch (err) {
      res.status(500).json({ message: 'Connecting to database failed' })
      return
    }

    let result

    try {
      result = await insertDocyment(client, 'events', 'newsletter', newEmail)
      client.close()
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' })
      return
    }

    newEmail.id = result.insertedId
    res.status(201).json({ message: 'Success', email: newEmail })
  }
}

export default handler
