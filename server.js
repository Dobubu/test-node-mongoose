const http = require('http');
const mongoose = require('mongoose');

const Room = require('./models/room');

mongoose.connect('mongodb://localhost:27017/hotel')
  .then(() => console.log('db connect success'))
  .catch(e => console.log(e));



// const testRoom = new Room(
//   { 
//     name: 'Mongoose 豪華單人房 2', 
//     price: 3000, 
//     rating: 4.5 
//   }
// );

// testRoom.save()
//   .then(() => console.log('insert data success.'))
//   .catch(e => console.warn(e));



const requestListener = async (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  };

  if(req.url === '/rooms' && req.method === 'GET') {
    const data = await Room.find();

    res.writeHead(200, headers);
    res.write(JSON.stringify({
      'status': 'success',
      data
    }))
    
    res.end();
  } else if(req.url === '/rooms' && req.method === 'POST') {
    req.on('end', async () => {
      try {
        const { name, price, rating } = JSON.parse(body);
        const data = await Room.create({ 
          name,
          price,
          rating
        });

        res.writeHead(200, headers);
        res.write(JSON.stringify({
          'status': 'success',
          data
        }));
        res.end();
      } catch(e) {
        res.writeHead(400, headers);
        res.write(JSON.stringify({
          'status': 'error',
          'error': e.message
        }))
        res.end();
      }
    })
  };
};

const server = http.createServer(requestListener);
server.listen(3005);