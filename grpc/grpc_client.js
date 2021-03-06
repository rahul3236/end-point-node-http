"use strict";
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const fs = require("fs");
const PROTO_PATH = __dirname + "/helloworld.proto";

const GRPC_HOST = process.env.GRPC_HOST || "localhost";
const GRPC_PORT = process.env.GRPC_PORT || "50051";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const hello_proto = grpc.loadPackageDefinition(packageDefinition);

const credentials = grpc.credentials.createSsl(
  fs.readFileSync(path.resolve("client_certs/ca_bundle.crt")),
  fs.readFileSync(path.resolve("client_certs/private.key")),
  fs.readFileSync(path.resolve("client_certs/certificate.crt"))
);

function makeGrpcRequestToServer(method, params, jwtToken) {
  return new Promise((resolve, reject) => {
    console.info(
      `
        sending request to ${GRPC_HOST}:${GRPC_PORT}
        jwt token: ${JSON.stringify(jwtToken)}
      `
    );
    const client = new hello_proto.Hello(
      `${GRPC_HOST}:${GRPC_PORT}`,
      credentials
    );

    const meta = new grpc.Metadata();
    meta.add("token", `Bearer ${JSON.stringify(jwtToken)}`);

    client[method](params, meta, function (err, response) {
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  });
}

module.exports = { makeGrpcRequestToServer };
