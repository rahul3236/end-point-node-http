'use strict';
const express = require('express');
const http = require('http');
const { makeGrpcRequestToServer } = require('./grpc/grpc_client');
const PORT = process.env.PORT || 3000;
const googleJwt = require('./google-jwt.js');
const serviceKey = ''
const app = express();

app.get('/:name', indexFunction);

app.use(function (req, res, next) {
  const message = `Unknown route: ${req.path}`;
  console.warn(message);
  res.status(404).send(message);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send(err);
});

const server = http.createServer(app);
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

async function indexFunction(req, res) {
  try {
    const jwtToken = await googleJwt.createToken();
    let response = await makeGrpcRequestToServer(
      'sayHello', 
      {
        name: req.params.name,
      },
      jwtToken);
    res.json({ message: response.message });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.info('Listening on ' + bind);
}
