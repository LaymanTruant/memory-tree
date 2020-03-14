#!/usr/bin/env bash

PROJECT= # YOUR_PROJECT_ID
REGION=asia-east1
ZONE=asia-east1-a
KUBERNETES_VERSION=1.13

CLUSTER_NAME= # YOUR_CLUSTER_NAME

API_GCP_SERVICE_ACCOUNT_NAME="${CLUSTER_NAME}-api"
API_GCP_SERVICE_ACCOUNT_ID="${API_GCP_SERVICE_ACCOUNT_NAME}@${PROJECT}.iam.gserviceaccount.com"
API_IMAGE_FILES_BUCKET_NAME=${PROJECT}-${CLUSTER_NAME}-image-files
