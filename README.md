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


### Local Frontend, In-Cluster Backend

💡 This setup assumes that the UI backend (w/ bearer token access control) is available at the URL stored under `API_PROXY_URL` in `.env.fsd`; and therefore doesn't require Kubernetes port forwarding into OpenShift.

1. Run the front-end like this:
   ```shell
   npm install
   env DOTENV_CONFIG_PATH=.env.fsd npm run dev
   ```

2. Browse [http://localhost:8080](http://localhost:8080)

### Local Frontend and Backend

⚠ This procedure is deprecated for two reasons: it requires the ability to compile and run Go code on your workstation; and it doesn't let one test bearer token authentication.

1. Go to the 📁 `backend` directory and execute `./ctl.sh`.

   ```shell
   cd backend
   ./ctl.sh run
   ```

   Wait until the build is done and the server is running.

2. In a separate terminal, run a port forward to the Hubble relay:

   ```shell
   kubectl port-forward -n cilium-system deployment/hubble-relay 50051:4245
   ```

3. In yet another separate terminal, run the front-end:
   ```shell
   npm install
   npm run dev
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
