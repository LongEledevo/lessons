var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
  mysql      = require('mysql');
cors = require('cors')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/quiz_app',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log("Connected !!!")
  }).catch(err => {
    console.log(err);
  }); 



app.use(cors({}))
app.use(bodyParser.json());

var routes = require('./api/route/lesson');
routes(app);
// var routes2 = require('./api/route/userRoutes')
// routes2(app)
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('Server started on Long oiiiiiiiiiiiiiiiiii : ' + port);
