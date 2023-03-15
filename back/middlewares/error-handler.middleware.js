const errorHandler = (error, req, res ,next) => {
    res.status(error.code)
}

module.exports = errorHandler