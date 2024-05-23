import React from 'react';

import { FilterEntry } from '~/domain/filtering';
import { NamespaceDescriptor } from '~/domain/namespaces';
import { sendEventToParentWindow } from "~/iframe-api";

import css from "./MashupNotifyButton.scss";

export interface Props {
  namespace: NamespaceDescriptor | null;
  filters: FilterEntry[];
}

export function MashupNotifyButton(props : Props) {
  function clicked () {
    sendEventToParentWindow({
      kind: "hubble-ui-view-attention-request",
      namespace: props.namespace?.namespace,
      filters: props.filters
    });
  }
  return <button className={css.mashupNotify} onClick={clicked}>🚫</button>;
}
