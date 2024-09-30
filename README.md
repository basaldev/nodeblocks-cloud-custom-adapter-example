<img src="./docs/logo.png">

# Auth Service Custom Adapter example for Nodeblocks Cloud

This repository contains an example of a custom adapter for the Auth Service in Nodeblocks Cloud.
All the templates are available in [this repository](https://github.com/basaldev/nodeblocks-cloud-custom-adapter-template) including the documentation.

## Installation

To install the packages, please get npm token from Basal team and set it into environment variable.

```bash
export NPM_TOKEN=YOUR_NPM_TOKEN
npm ci
```

## Configuration

> We recommend to create the configuration files below by running `npm run adapter:dev` interactively.

Create `nbc.sdk.json` file in the root directory and add the following configuration to specify the service and the version of the adapter.

```bash
cp nbc.sdk.json.default nbc.sdk.json
```

```json
{
  "adapter":{
    "service":"auth|user|organization|catalog|order|review|chat|notification",
    "version":"x.x.x"
  }
}
```

Create a `.env.${service}` file in the root directory and add the following configuration to pass the configs to the service and the adapter.

```bash
cp .env.default .env.${service}
```

```bash
ADAPTER_PACKAGE_NAME=`Absolute path to the adapter package`
PORT=8080
NODE_ENV=production
SERVICE_XXXX=`Service configuration (depends on the service)`
...
ADAPTER_XXXX=`Adapter configuration (depends on the service and the adapter)`
...
```

## Usage

### Start the development server

```bash
npm run adapter:dev
```

### Start the server with the custom adapter

```bash
npm start
```