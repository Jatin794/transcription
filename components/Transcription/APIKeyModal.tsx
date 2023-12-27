import React, { PropsWithChildren } from 'react';
import APIKeyModalInner, { APIKeyModalInnerProps } from './APIKeyModalInner';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';
import { useOpenAIAPIKeySetterAndGetter } from '../libs/localStorage';

export interface APIKeyModalProps
  extends Pick<APIKeyModalInnerProps, 'opened' | 'onClose' | 'showAPIKeyNeededAlert'> {}

/**
 * Modal that can be shown to set the API key. Will get the API key from
 * localStorage on mount and update it from there
 */
const APIKeyModal: React.FunctionComponent<APIKeyModalProps> = React.memo(function APIKeyModal(
  props: PropsWithChildren<APIKeyModalProps>
) {
  const { apiKey, onAPIKeyChange } = useOpenAIAPIKeySetterAndGetter();

  const handleAPIKeyChange = useMemoizedCallback((newAPIKey: string | null) => {
    onAPIKeyChange(newAPIKey);
    props.onClose();
  }, []);

  return <APIKeyModalInner {...props} apiKey={apiKey} onAPIKeyChange={handleAPIKeyChange} />;
});

export default APIKeyModal;
