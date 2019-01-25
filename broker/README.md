# Zeebe Docker Stack

This directory contains the files needed to start a Zeebe 0.15 broker, the Zeebe Simple Monitor, and an H2 database.

Once started, the broker will be available on port 26500, and the Simple Monitor will be accessible on [http://localhost:8080](http://localhost:8080).

## Prerequisites

* [Docker](https://docs.docker.com/install/)

### Recommended

* [Portainer](https://www.portainer.io/installation/)

## Note for Windows Users

You need to create a link to your mount directory on Windows if you use WSL.

See [this issue](https://github.com/Microsoft/WSL/issues/1854#issuecomment-291845122).

## Starting and Stopping the Zeebe Stack

__Note:__ The `docker-compose` command relies on a `docker-compose.yml` file in the current directory to know which stack it is managing. To create and destroy the Zeebe stack, you need to run `docker-compose` commands in this directory.

### Run the stack in a terminal

In this directory, run the following command:

```bash
docker-compose up
```

This starts the Zeebe Docker stack in the foreground and pipes the output of each of the three containers in the stack to your terminal.

To bring the stack down, hit Ctrl-C. This will stop the containers, but will not destroy them. To destroy the containers, run the following command in this directory:

```bash
docker-compose down
```

### Run the stack in the background

To run the stack in the background, run:

```bash
docker-compose up -d
```

To manage and inspect the stack you can use the Docker CLI or do it via your browser using Portainer.

To stop and destroy the containers in the stack, run:

```bash
docker-compose down
```
