require('./models/Users');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');


const app = express();

//setup to understand json data "bodyParser"
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://sudhanshu:<pwd>@cluster0.es4av.mongodb.net/<test>?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    // createIndexes: true
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('conected to mongo instance')
});

mongoose.connection.on('error', (err) => {
    console.error('error connecting to mongo', err);
});


app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
});

app.listen(3000, () => {
    console.log('listening on terminal 3000!')
});

