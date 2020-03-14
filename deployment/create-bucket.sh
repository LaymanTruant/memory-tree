#!/usr/bin/env bash

# service_account_name string
# service_account_id string
# service_account_desc string
# service_account_roles string
function create_service_account {
  if [ "$#" -ne 4 ]; then
    echo "Error: create_service_account: Invalid number of arguments!" >&2
    return 1
  fi

  local service_account_name="$1"
  local service_account_id="$2"
  local service_account_desc="$3"
  local service_account_roles="$4"

  echo "Checking to see if service account exists. This will report an Error if it does not."
  gcloud iam service-accounts describe ${service_account_id} --project ${PROJECT} >/dev/null 2>&1

  if [ "$?" -ne 0 ]; then
    echo "Service account ${service_account_name} didn't exist. Creating."
    gcloud iam service-accounts create ${service_account_name} --display-name "${service_account_desc}" --project ${PROJECT}
  fi

  echo "Granting roles '${service_account_roles}' to service account ${service_account_name}."
  while IFS=';' read -ra ROLES; do
    for role in "${ROLES[@]}"; do
      gcloud projects add-iam-policy-binding ${PROJECT} --member "serviceAccount:${service_account_id}" --role "roles/${role}" >/dev/null
    done
  done <<< "$service_account_roles"
}

# bucket_name string
create_bucket_if_not_exists() {
  local bucket_name="$1"
  local bucket_type="$2"
  local bucket_location="$3"
  local project_name="$4"
  if [ -z "$3" ]; then
    bucket_location=us
  fi
  if [ -z "$4" ]; then
    project_name=$PROJECT
  fi
  gsutil ls -p ${project_name} gs://${bucket_name}/ >/dev/null
  if [ "$?" -ne 0 ]; then
    echo "Creating bucket $bucket_name"
    gsutil mb -p ${project_name} -c ${bucket_type} -l $bucket_location gs://${bucket_name}/
  fi
}

set -a
source ./config.sh
set +a

gcloud container clusters get-credentials $CLUSTER_NAME --project $PROJECT --zone $ZONE

create_service_account "${API_GCP_SERVICE_ACCOUNT_NAME}" "${API_GCP_SERVICE_ACCOUNT_ID}" "${CLUSTER_NAME} API Service service account" "monitoring.viewer"

create_bucket_if_not_exists ${API_IMAGE_FILES_BUCKET_NAME} "nearline"
gsutil iam ch "serviceAccount:${API_GCP_SERVICE_ACCOUNT_ID}:objectCreator,objectViewer,legacyBucketReader,legacyBucketWriter" gs://${API_IMAGE_FILES_BUCKET_NAME}/

