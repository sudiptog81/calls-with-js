require('dotenv').config();
const Vonage = require('@vonage/server-sdk');
const express = require('express');
const morgan = require('morgan');

const app = express();
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  applicationId: process.env.VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_PRIVATE_KEY_PATH
});

app.use(morgan('tiny'));
app.use(express.json());

app.get('/call', (req, res) => {
  vonage.calls.create({
    to: [{
      type: 'phone',
      number: req.query.to || process.env.TO_NUMBER
    }],
    from: {
      type: 'phone',
      number: process.env.VONAGE_NUMBER,
    },
    ncco: [{
      action: 'talk',
      text: req.query.msg || 'This call was made from JavaScript.',
      language: 'en-IN',
      style: '4'
    }]
  }, (err, resp) => {
    if (err)
      console.error(err);
    if (resp)
      console.log(resp);
  });
  res.json('ok');
});

app.post('/event', (req, res) => {
  console.log(req.body);
  res.status(200).send('');
});

app.post('/answer', (req, res) => {
  const number = req.body.from.split('').join(' ');
  const ncco = [
    {
      action: 'talk',
      text: 'Thank you for calling from ' + number,
      language: 'en-IN',
      style: '4'
    },
    {
      action: 'stream',
      streamUrl: [
        'https://www.albinoblacksheep.com/audio/mp3/RickRollMarioPaint.mp3'
      ]
    }
  ];
  res.json(ncco);
});

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));
