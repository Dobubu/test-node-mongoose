const http = require('http');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hotel')
  .then(() => console.log('db connect success'))
  .catch(e => console.log(e));

const requestListener = (req, res) => {
  console.log('req: ', req.url);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(3005);