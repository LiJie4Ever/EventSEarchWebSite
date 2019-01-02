const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const googleMap = require('./routes/googleMap');
const ticketMaster = require('./routes/ticketMaster');
const spotify = require('./routes/spotify');
const songkick = require('./routes/songkick');
const googlePhoto = require('./routes/googlePhoto');

const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => {
  console.log(`Server is Running at localhost:${port}`);
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/googleMap', googleMap);
app.use('/ticketMaster', ticketMaster);
app.use('/spotify', spotify);
app.use('/songkick', songkick);
app.use('/googlePhoto', googlePhoto);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { error: err });
})





