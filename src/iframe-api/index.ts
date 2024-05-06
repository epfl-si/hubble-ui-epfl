/**
 * API for sending / receiving messages across iframes
 */

export type ReceivedMessage = BearerToken;

type BearerToken = {
  kind: "token",
  token: string
}

export type SentMessage = BearerTokenRequest;

type BearerTokenRequest = {
  kind: "bearer-token-request"
}

export function sendEventToParentWindow (event : SentMessage, targetDomain ?: string) {
  window.parent.postMessage(event, targetDomain || "*");
}

/**
 * @return A void function that unregisters the handler when called.
 */
export function onParentIframeMessage (handler : (message : ReceivedMessage) => void)
: () => void {
  function processEvent (event : MessageEvent) {
    if (event.source !== window.parent) {
      console.error("OMG H4XX !!1!");
      return;
    }
    handler(event.data);
  }
  window.addEventListener("message", processEvent);

  return () => window.removeEventListener("message", processEvent);
}
