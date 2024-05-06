/**
 * API for sending / receiving messages across iframes
 */

export type ReceivedMessage = BearerToken;

type BearerToken = {
  kind: "token",
  token: string
}
