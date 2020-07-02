const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongoUri = 'mongodb+srv://sudhanshu:<any>@cluster0.es4av.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    // useCreateIndex: true
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('conected to mongo instance')
});

mongoose.connection.on('error', (err) => {
    console.error('error connecting to mongo', err);
});


app.get('/', (req, res) => {
    res.send('Hi there!')
});

app.listen(3000, () => {
    console.log('listening on terminal 3000!')
});

