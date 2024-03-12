export function errorResponse(res, status, message) {
    return res.status(status || 500).json({ message: message || 'Inserting data failed' })
}