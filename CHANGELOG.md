💡 This change log and the version numbering scheme are authoritative only for the developments made by EPFL, in the fork hosted at https://github.com/epfl-si/hubble-ui-epfl

# Version epfl-0.2.1

- Don't show ⚙️ on “world” service card
- More bug fixes

# Version epfl-0.2.0

- Synchronous messaging to request a token from parent
- Bug fixes

# Version epfl-0.1.0

- Works in a sandboxed iframe
- Bi-directional communication with parent frame: receives bearer tokens (to authenticate onto `/api/` which is assumed to be served in the same origin as the front-end code); sends click events with details
