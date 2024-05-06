import React from 'react';
import { createRoot } from 'react-dom/client';
import Split from 'react-split';
import "./split.css";

const div = document.getElementById("hubble-ui-iframed") as Element;
createRoot(div).render(<React.StrictMode>
                         <HubbleTestUI />
                       </React.StrictMode>);

function HubbleTestUI () {
  return <Split direction="vertical" minSize={1} className="split-vertical" sizes={[20, 80]}>
           <TopControls />
           <div>
             <Split direction="horizontal" className="split-horizontal" sizes={[30, 70]}>
               <LeftControls />
               <iframe src="//hubble-ui-127-0-0-1.nip.io:8080/"
               sandbox="allow-same-origin allow-scripts" />
             </Split>
           </div>
         </Split>;
}

function TopControls () {
  return <div></div>;
}

function LeftControls () {
  return <div></div>;
}
