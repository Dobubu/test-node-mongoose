const http = require('http');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hotel')
  .then(() => console.log('db connect success'))
  .catch(e => console.log(e));

const RoomSchema = {
  name: String,
  price: {
    type: Number,
    required: [true, '價格必填']
  },
  rating: Number
};

const Room = mongoose.model('Room', RoomSchema);

const requestListener = (req, res) => {
  console.log('req: ', req.url);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(3005);