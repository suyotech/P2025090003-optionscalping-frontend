#!/bin/bash

set -e

IMAGE_NAME="optscalp-frontend"
TAG="v1.0.0"
SSH_HOST="${1:-}"
SERVER_FOLDER="~/projects/optscalp/frontend"
FILENAME=${IMAGE_NAME}_${TAG}.gz
DOCKER_COMPOSE_FILE="docker-compose.yml"
DOCKER_COMPOSE_DOWN="docker compose -f $SERVER_FOLDER/$DOCKER_COMPOSE_FILE down"
DOCKER_COMPOSE_UP="docker compose -f $SERVER_FOLDER/$DOCKER_COMPOSE_FILE up -d"
IMAGE_PATH=$SERVER_FOLDER/$FILENAME

function build_image() {
    echo "Building Docker image..."
    docker build -t $IMAGE_NAME:$TAG . --no-cache

    echo "Saving Docker image..."
    docker save $IMAGE_NAME:$TAG | gzip > $FILENAME
}


function transfer_image() {
       if [ -z $SSH_HOST ]; then
        echo "SSH_HOST is not set. Cannot load image on remote server."
        exit 1
    fi
    echo "Transferring image to remote server..."
    echo "scp $FILENAME $SSH_HOST:$SERVER_FOLDER"
    scp $FILENAME $SSH_HOST:$SERVER_FOLDER

    echo "Cleaning up transferred files..."

    rm $FILENAME
}

function load_image_remote() {
    if [ -z $SSH_HOST ]; then
        echo "SSH_HOST is not set. Cannot load image on remote server."
        exit 1
    fi
    ssh $SSH_HOST "$DOCKER_COMPOSE_DOWN && docker rmi $IMAGE_NAME:$TAG || true && gunzip -c $IMAGE_PATH | docker load -i $IMAGE_PATH && rm $IMAGE_PATH && $DOCKER_COMPOSE_UP"
}


case "$2" in
    build)
        build_image
        ;;
    transfer)
        transfer_image
        ;;
    load)
        load_image_remote
        ;;
    *)
        build_image
        transfer_image
        load_image_remote
        ;;
esac