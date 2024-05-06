import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Split from 'react-split';
import "./split.css";
import { ReceivedMessage as IframeSentMessage,
  SentMessage as IframeReceivedMessage,
  onParentIframeMessage
} from "../../src/iframe-api";

const div = document.getElementById("hubble-ui-iframed") as Element;
createRoot(div).render(<React.StrictMode>
                         <HubbleTestUI />
                       </React.StrictMode>);

const iframeOrigin = "http://hubble-ui-127-0-0-1.nip.io:8080/";

function HubbleTestUI () {
  const [eventLog, setEventLog] = useState<Array<IframeReceivedMessage>>([]);
  useEffect(() => {
    return onReceiveMessageFromIframe((event) => {
      if (event.kind ===  "endpoint-card-clicked-⚙️") {
        setEventLog([...eventLog, event]);
      }
    });
  }, []);

  return <Split direction="vertical" minSize={1} className="split-vertical" sizes={[20, 80]}>
           <TopControls />
           <div>
             <Split direction="horizontal" className="split-horizontal" sizes={[30, 70]}>
               <LeftControls log={eventLog}/>
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

function LeftControls (props : {log : Array<IframeReceivedMessage>}) {
  const { log } = props;
  return <ul>{ log.map((event, index) => <li key={ index }><code>{JSON.stringify(event)}</code></li> ) }</ul>;
}

function sendMessageToIframe (message : IframeSentMessage) {
  const iframeWindow = document.querySelector("iframe")?.contentWindow;
  if (! iframeWindow) {
    throw new Error("sendMessageToIframe: iframe not found");
  }
  iframeWindow.postMessage(message, iframeOrigin);
}

/**
 * @return A void function that unregisters the handler when called.
 */
function onReceiveMessageFromIframe (handler : (message : IframeReceivedMessage) => void)
: () => void {
  const secureHandler = (event : MessageEvent) => {
    // A number of browser plug-ins do `window.postMessage` from the
    // window to itself; see
    // https://github.com/facebook/react/issues/27529#issuecomment-1766536750
    if (event.source === window) return;

    if (isSameUrl(event.origin, iframeOrigin)) {
      handler(event.data);
    } else {
      console.error("OMG H4XX !1!!");
      console.log("Mismatched origins:", event.origin, iframeOrigin);
    }
  }

  window.addEventListener("message", secureHandler);
  return () => window.removeEventListener("message", secureHandler);
}

function isSameUrl (urlA : string, urlB : string) {
  if (urlA === urlB) return true;
  if (urlA + "/" === urlB) return true;
  if (urlB + "/" === urlA) return true;
  return false;
}
