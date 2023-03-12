const { decodeJWT } = require("../utils/jwt-utils")

const authentificateJWT =async (req, res, next) => {

    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.sendStatus(401)
    }

    let tokenData

    try {
        tokenData = await decodeJWT(token)
    } catch (error) {
        return res.sendStatus(403)
    }

    req.user = tokenData

    next()
}

module.exports = {
    authentificateJWT
}