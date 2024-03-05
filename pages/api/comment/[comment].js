import fs from 'fs'

import { buildEmailPath, extractEmail } from "../email";

function handler(req, res) {
    const eventId = req.query.comment
    const filePath = buildEmailPath();
    const commentData = extractEmail(filePath);

    const commentsByEvent = commentData.filter(el => el.eventId === eventId)

    if (req.method === 'POST') {
        const email = req.body.email
        const name = req.body.name
        const text = req.body.text

        const newComment = {
            id: new Date().toISOString(),
            email: email,
            name: name,
            text: text,
            eventId: eventId
        }

        commentData.push(newComment);

        fs.writeFileSync(filePath, JSON.stringify(commentData));
        res.status(201).json({ message: 'Success!', comment: newComment });
    } 
    res.status(200).json({comment: commentsByEvent})
}

export default handler