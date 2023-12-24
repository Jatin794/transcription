import React, { PropsWithChildren, useState } from 'react';
import APIKeyModalInner, { APIKeyModalInnerProps } from './APIKeyModalInner';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';
import {
  getOpenAIAPIKeyFromLocalStorage,
  setOpenAIAPIKeyInLocalStorage,
} from '../libs/localStorage';

export interface APIKeyModalProps
  extends Pick<APIKeyModalInnerProps, 'opened' | 'onClose' | 'showAPIKeyNeededAlert'> {}

/**
 * Modal that can be shown to set the API key. Will get the API key from
 * localStorage on mount and update it from there
 */
const APIKeyModal: React.FunctionComponent<APIKeyModalProps> = React.memo(
  (props: PropsWithChildren<APIKeyModalProps>) => {
    const [apiKey, setAPIKey] = useState<string>(getOpenAIAPIKeyFromLocalStorage() ?? '');

    const handleAPIKeyChange = useMemoizedCallback((newAPIKey: string) => {
      setAPIKey(newAPIKey);
      setOpenAIAPIKeyInLocalStorage(newAPIKey);
      props.onClose();
    }, []);

    return <APIKeyModalInner {...props} apiKey={apiKey} onAPIKeyChange={handleAPIKeyChange} />;
  }
);

export default APIKeyModal;
