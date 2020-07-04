const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');


module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    //authorization === 'Bearer fhakjfhkjdfh';
    if (!authorization) {
        return res.status(401).send({ error: 'you must be logged in.' });
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in..' });
        }
        //extract userId from payload
        const { userId } = payload;

        //lookup from mongoDB
        const user = await Users.findById(userId);
        req.user = user;
        next();
    });
};