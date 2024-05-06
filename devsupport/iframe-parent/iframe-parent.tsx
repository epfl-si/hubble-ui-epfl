import React from 'react';
import { createRoot } from 'react-dom/client';
import Split from 'react-split';
import "./split.css";
import { ReceivedMessage as IframeSentMessage } from "../../src/iframe-api";

const div = document.getElementById("hubble-ui-iframed") as Element;
createRoot(div).render(<React.StrictMode>
                         <HubbleTestUI />
                       </React.StrictMode>);

const iframeOrigin = "http://hubble-ui-127-0-0-1.nip.io:8080/";

function HubbleTestUI () {
  return <Split direction="vertical" minSize={1} className="split-vertical" sizes={[20, 80]}>
           <TopControls />
           <div>
             <Split direction="horizontal" className="split-horizontal" sizes={[30, 70]}>
               <LeftControls />
               <iframe src={ iframeOrigin }
               sandbox="allow-same-origin allow-scripts allow-modals" />
             </Split>
           </div>
         </Split>;
}

function TopControls () {
  return <form onSubmit={ function(e) {
             e.preventDefault();
             const data = new FormData(e.target as HTMLFormElement);
             sendMessageToIframe({ kind: "token", token: data.get("token") as string });
           }}>
           <input name="token" type="password" placeholder='sha256~YOURTOKENHERE' />
           <button type={"submit"}>Log in</button>
         </form>;
}

function LeftControls () {
  return <div></div>;
}

function sendMessageToIframe (message : IframeSentMessage) {
  const iframeWindow = document.querySelector("iframe")?.contentWindow;
  if (! iframeWindow) {
    throw new Error("sendMessageToIframe: iframe not found");
  }
  iframeWindow.postMessage(message, iframeOrigin);
}
