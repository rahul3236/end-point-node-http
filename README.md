# Http End-Point

## Development 

* Clone the repo
* Change the directory
* Install dependencies: `yarn install`
* To run locally: `npm start`

## Docker

* Install docker using a method suitable for your operating system
* Run `sudo docker build -t gke-http-end-point .` to build the docker image
* Run `sudo docker run -d --rm -p 3000:3000 --network="host" --env 'GRPC_HOST=192.168.192.105' http-end-point` to launch the container
* Publish to GCP Container Registry:
```
PROJECT_ID=level01
IMAGE_NAME=gke-http-end-point
docker tag ${IMAGE_NAME} gcr.io/${PROJECT_ID}/${IMAGE_NAME}
docker push gcr.io/${PROJECT_ID}/${IMAGE_NAME}
```

## Environment Variables

* GRPC_HOST: gRPC end-point host, default: `localhost`
* GRPC_PORT: gRPC end-point port, default: `50051`
* PORT: Http end-point port, default: to `3000`

## Deployment to gke

* `kubectl apply --filename ./k8s/deployment.yaml`