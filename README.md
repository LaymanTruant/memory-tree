# Memory Tree

## Run Locally
- Steps:
    1. Fill out `PROJECT` and `CLUSTER_NAME` in [config.sh](./deployment/config.sh) with your GCP's project ID and cluster name.
    1. Create bucket on GCP.
        ```
        cd deployment
        ./create-bucket.sh
        ```
    1. Go to api folder and run Postgres locally.
        ```
        cd api
        docker-compose up
        ```
    1. Use your IDE to open [api](./api) project. 
    1. Set up the environment variables `PROJECT` to your GCP's project ID and `API_IMAGE_FILES_BUCKET_NAME` to `${PROJECT}-${CLUSTER_NAME}-image-files`.
    1. Run api service locally, server default port is 3001.
    1. Start the frontend service.
        ```
        cd ui
        npm install
        yarn start
        ```
