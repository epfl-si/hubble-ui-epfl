<h1 align="center">Hubble UI</h1>
<p align="center">
  Hubble UI is an open-source user interface for <a href="https://github.com/cilium/hubble">Cilium Hubble</a>.
</p>

## 🚀 Installation

Hubble UI is installed as part of Hubble. Please see the Hubble [Getting Started Guide](https://docs.cilium.io/en/stable/gettingstarted/hubble/#deploy-cilium-and-hubble) for instructions.

## 🌐 Why Hubble UI?

Troubleshooting microservices application connectivity is a challenging task. Simply looking at `kubectl get pods` does not indicate dependencies between each service, external APIs, or databases.

Hubble UI enables zero-effort automatic discovery of the service dependency graph for Kubernetes Clusters at L3/L4 and even L7, allowing user-friendly visualization and filtering of those dataflows as a Service Map.

See [Hubble Getting Started Guide](https://docs.cilium.io/en/stable/gettingstarted/hubble/#deploy-cilium-and-hubble) for details.

![Service Map](promo/servicemap.png)

## 🛠 Development

### Frontend and Backend on Developer Workstation

The following procedure lets Hubble UI connect to an already existing Hubble relay instance in Kubernetes / OpenShift. It requires running your own backend locally, which in turn requires the capability to build Go programs on your workstation.

ℹ️  Running the front-end alone to connect to the backend in OpenShift is not supported (for now), as it would require setting up a reverse proxy to bypass CORS issues.

1. Go to the 📁 `backend` directory and execute `./ctl.sh`.

   ```shell
   cd backend
   env CORS_ENABLED=1 ./ctl.sh run
   ```

   Wait until the build and server are running.

2. In a separate terminal, run a port forward to Hubble Relay.

   ```shell
   kubectl port-forward -n cilium-system deployment/hubble-relay 50051:4245
   ```
   
3. In yet another separate terminal, run the front-end.
   ```shell
   npm install
   npm run watch
   ```

4. Browse [http://localhost:8080](http://localhost:8080)

### Docker 🐳

Build the backend Docker image:

```shell
make hubble-ui-backend
```

Build the frontend Docker image:

```shell
make hubble-ui
```

## 🐝 Community

Learn more about the [Cilium community](https://github.com/cilium/cilium#community).

## 🌏 Releases

Push a tag into GitHub and ping a maintainer to accept the [GitHub action run](https://github.com/cilium/hubble-ui/actions) which pushes the built images into the official repositories.

## ⚖️ License

[Apache License, Version 2.0](https://github.com/cilium/hubble-ui/blob/master/LICENSE)
