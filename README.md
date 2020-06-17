# Http End-Point

## Development 

* Clone the repo
* Change the directory
* Install dependencies: `yarn install`
* To run locally: `npm start`

## Docker

* Run `sudo docker build -t http-end-point .` to build the docker image
* Run `sudo docker run -d --rm -p 3000:3000 --network="host" --env 'GRPC_HOST=192.168.192.105' http-end-point` to run the container
* Install docker using a method suitable for your operating system

## Environment Variables

* GRPC_HOST: gRPC end-point host, default: `localhost`
* GRPC_PORT: gRPC end-point port, default: `50051`
* PORT: Http end-point port, default: to `3000`
