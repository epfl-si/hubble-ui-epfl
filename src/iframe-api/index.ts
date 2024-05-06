/**
 * API for sending / receiving messages across iframes
 */

import { KV } from '~/domain/misc';

export type ReceivedMessage = BearerToken;

type BearerToken = {
  kind: "token",
  token: string
}

export type SentMessage = EndpointCardClicked;

type EndpointCardClicked = {
  kind: "endpoint-card-clicked-⚙️",
  namespace ?: string,
  labels: Array<KV>
}

export function sendEventToParentWindow (event : SentMessage, targetDomain ?: string) {
  window.parent.postMessage(event, targetDomain || "*");
}
