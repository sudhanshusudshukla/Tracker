const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');


const Tracks = mongoose.model('Tracks');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    const tracks = await Tracks.find({ userId: req.user._id });

    res.send(tracks);
});

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) {
        return res.status(422).send({ error: 'You must provide a name and locations' });
    }

    try {
        const tracks = new Tracks({ name, locations, userId: req.user._id });
        await tracks.save();
        res.send(tracks);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }

});

module.exports = router;