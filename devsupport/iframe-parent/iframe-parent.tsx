import React from 'react';
import { createRoot } from 'react-dom/client';

const div = document.getElementById("hubble-ui-iframed") as Element;
createRoot(div).render(<React.StrictMode>
                         <HubbleTestUI />
                       </React.StrictMode>);

function HubbleTestUI () {
  return     <iframe src="//hubble-ui-127-0-0-1.nip.io:8080/"
               sandbox="allow-same-origin allow-scripts" />;
}
