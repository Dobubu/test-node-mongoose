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
  } else if(req.url === '/rooms' && req.method === 'DELETE') {
    const data = await Room.deleteMany({});

    res.writeHead(200, headers);
    res.write(JSON.stringify({
      'status': 'success',
      data    // or data: []，直接回傳空陣列
    }));

    res.end();
  } else if(req.url.startsWith('/rooms/') && req.method === 'DELETE') {
    try {
      const id = req.url.split('/').pop();
      const rooms = await Room.find();
      const isExist = rooms.find(o => o.id === id);

      if(!isExist) throw new Error('room not exist.');

      await Room.findByIdAndDelete(id);

      res.writeHead(200, headers);
      res.write(JSON.stringify({
        'status': 'success',
        'message': 'delete success'
      }));

      res.end();
    } catch (e) {
      res.writeHead(400, headers);
      res.write(JSON.stringify({
        'status': 'false',
        'error': e.message
      }));

      res.end();
    }
  } else if(req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(JSON.stringify({
      'status': 'false',
      'message': 'page not found!'
    }));
    res.end();
  };;
};

const server = http.createServer(requestListener);
server.listen(3005);