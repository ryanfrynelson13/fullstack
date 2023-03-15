const jwt = require('jsonwebtoken')

const generateJWT = ({_id, email}) => {
    return new Promise((resolve, reject) => {
        const data = {_id, email}
        const secret = process.env.JWT_secret
        const options = {
            algorithm: 'HS512',
            expiresIn: '12h'
        }

        jwt.sign(data, secret, options, (error, token) => {
            if(error) {
                return reject(error)
            }

            const expire = new Date(jwt.decode(token).exp * 1000).toISOString()
            resolve({token, expire})
        })
    })
}

const decodeJWT = (token) => {
    if(!token) {
        return Promise.reject(new Error('Invalid JWT'))
    }

    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_secret
        jwt.verify(token, secret, (error, data) => {
            if(error){
                return reject(error)
            }

            resolve({
                id: data._id,
                email: data.email
            })
        })
    })
}

module.exports = {
    generateJWT,
    decodeJWT
}