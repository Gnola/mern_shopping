const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')

app.use(bodyParser.json());

const items = require('./routes/api/items');
app.use('/api/items', items);



const db = require('./config/keys').mongoURI;

mongoose.connect(db).then(() => {
    console.log('Mongo Connected')
  }).catch((err) => {
    console.log(err);
  })


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Listening...');
})
