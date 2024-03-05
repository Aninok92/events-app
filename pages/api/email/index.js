import fs from 'fs'
import path from 'path'

export function buildEmailPath() {
    return path.join(process.cwd(), 'email.json')
}

export function extractEmail(filePath) {
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data
}

function handler(req, res) {
    if(req.method === "POST") {
    const email = req.body.email
    

    const newEmail = {
        id: new Date().toISOString(),
        email: email
    }

    const filePath = buildEmailPath();
    const data = extractEmail(filePath);
    data.push(newEmail);

    console.log('filePath', filePath)

    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success', email: newEmail })
}
}

export default handler