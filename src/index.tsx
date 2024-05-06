import React from 'react';
import { createRoot } from 'react-dom/client';

import { Environment } from '~/environment';
import { Store } from '~/store';
import { DataLayer } from '~/data-layer';
import { Router, RouterKind, RouterProvider } from '~/router';
import { UILayer } from '~/ui-layer';
import { Application, ApplicationProvider } from '~/application';
import { ReceivedMessage, sendEventToParentWindow, onParentIframeMessage } from "~/iframe-api";

import { e2e } from '~e2e/client';

import './blueprint.scss';
import './index.scss';

declare global {
  interface Window {
    debugTools: any;
  }
}

const buildAPIUrl = (env: Environment): string => {
  if (!env.isDev) {
    return `${document.location.origin}/api/`;
  }

  // NOTE: Do not edit those `process.env.VAR_NAME` variable accesses
  // because they only work if you have such a direct call for them.
  const path = process.env.API_PATH || 'api';
  return path?.startsWith('/') ? path : `/${path}`;
};

type Auth = { token ?: string; };

function obtainToken (auth : Auth) {
  return new Promise<void>((resolve, reject) => {
    const requestTokenInterval = setInterval(
      () => {
        sendEventToParentWindow({ kind: "bearer-token-request" });
        console.log(".");
      },
      2000);

    const stopReceiving = onParentIframeMessage((message : ReceivedMessage) => {
      if (message.kind === "token") {
        auth.token = message.token;
        cleanupAndResolve();
      }
    });

    function cleanupAndResolve () {
      stopReceiving();
      clearInterval(requestTokenInterval);
      resolve();
    }
  });
}

const run = async () => {
  const env = Environment.new();
  const store = new Store();

  document.getElementById("app")!.innerHTML = "Waiting for bearer token...";
  const auth : Auth = {};
  await obtainToken(auth);

  const apiUrl = buildAPIUrl(env);
  const dataLayer = DataLayer.new({
    store,
    customProtocolBaseURL: apiUrl,
    customProtocolRequestTimeout: 3000,
    customProtocolMessagesInJSON: env.isDev,
    customProtocolCORSEnabled: true,
    customProtocolBearerToken: () => auth.token as string
  });

  const router = new Router(env.isTesting ? RouterKind.Memory : RouterKind.Browser, dataLayer);

  const uiLayer = UILayer.new({
    router,
    store,
    dataLayer,
    isCSSVarsInjectionEnabled: true,
  });

  const renderFn = (targetElem: Element, app: Application) => {
    const root = createRoot(targetElem);

    // NOTE: Use RouterProvider here not to create dependency cycle:
    // Application -> Router -> <Our app component> -> useApplication
    root.render(
      <ApplicationProvider app={app}>
        <RouterProvider router={app.router} />
      </ApplicationProvider>,
    );
  };

  const app = new Application(env, router, store, dataLayer, uiLayer, renderFn);

  router.onInitialized(() => {
    e2e.attributes.setEnabled(router.mockModeParam != null);
  });

  app
    .onBeforeMount(_app => {
      uiLayer.onBeforeMount();
    })
    .onMounted(app => {
      app.uiLayer.onMounted();
    })
    .mount('#app');
};

// TODO: run() if only we are running not as library
run();
