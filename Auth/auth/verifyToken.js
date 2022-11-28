module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        res.status(401).json({msg: "Token inválida"})
    }

    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (err) {
        res.status(400).json(err)
    }
}