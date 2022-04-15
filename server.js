const http = require('http');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hotel')
  .then(() => console.log('db connect success'))
  .catch(e => console.log(e));

const RoomSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: [true, '價格必填']
    },
    rating: Number
  },
  {
    versionKey: false,
    collection: 'roomA'
  }
)

const Room = mongoose.model('Room', RoomSchema);

const testRoom = new Room(
  { 
    name: 'Mongoose 豪華單人房 2', 
    price: 3000, 
    rating: 4.5 
  }
);

testRoom.save()
  .then(() => console.log('insert data success.'))
  .catch(e => console.warn(e));

const requestListener = (req, res) => {
  console.log('req: ', req.url);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(3005);