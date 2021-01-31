const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: '1147169',
  key: 'e343105e21bb9b98e53f',
  secret: '9145ebcb3ae8dd9df5db',
  cluster: 'us3',
  encrypted: true
});

app.set('PORT', process.env.PORT || 5000);


app.post('/message', (req, res) => {
  const payload = req.body;
  pusher.trigger('chat', 'message', payload);
  res.send(payload)
});


app.listen(app.get('PORT'), () => 
  console.log('Listening at ' + app.get('PORT')))


