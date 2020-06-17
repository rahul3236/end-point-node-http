'use strict';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/helloworld.proto';
const GRPC_HOST = process.env.GRPC_HOST || 'localhost';
const GRPC_PORT = process.env.GRPC_PORT || '50051'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const hello_proto = grpc.loadPackageDefinition(packageDefinition);

function makeGrpcRequestToServer(method, params) {
  return new Promise((resolve, reject) => {
    console.info(`sending request to ${GRPC_HOST}:${GRPC_PORT}`)
    const client = new hello_proto.Hello(
      `${GRPC_HOST}:${GRPC_PORT}`,
      grpc.credentials.createInsecure()
    );

    client[method](params, function (err, response) {
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  });
}

module.exports = { makeGrpcRequestToServer };
