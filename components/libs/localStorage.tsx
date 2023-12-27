import React, { useEffect, useState, PropsWithChildren, useMemo, useContext } from 'react';
import { useMemoizedCallback } from '../hooks/useMemoizedCallback';

const localStorageKey = 'openAIAPIKey';

const OpenAIAPIKeyContext = React.createContext<{
  apiKey: string | null;
  onAPIKeyChange: (key: string | null) => unknown;
}>({
  apiKey: null,
  onAPIKeyChange: () => {},
});

export interface OpenAIAPIKeyProviderProps {}

/**
 * Centralized store for the OpenAI API key so that it can be used in
 * different components up and down the tree
 */
export const OpenAIAPIKeyProvider: React.FunctionComponent<OpenAIAPIKeyProviderProps> = React.memo(
  function OpenAIAPIKeyProvider(props: PropsWithChildren<OpenAIAPIKeyProviderProps>) {
    const { children } = props;
    const { apiKey, setAPIKey } = useOpenAIAPIKeyFromLocalStorage();

    return (
      <OpenAIAPIKeyContext.Provider
        value={useMemo(() => ({ apiKey, onAPIKeyChange: setAPIKey }), [apiKey, setAPIKey])}
      >
        {children}
      </OpenAIAPIKeyContext.Provider>
    );
  }
);

/** Get the OpenAI API key setter and getter */
export function useOpenAIAPIKeySetterAndGetter() {
  return useContext(OpenAIAPIKeyContext);
}

/**
 * Server-side rendering compatible way to load the OpenAI API key
 * stored in browser LocalStorage
 */
function useOpenAIAPIKeyFromLocalStorage() {
  const [apiKey, setAPIKey] = useState<string | null>(null);

  useEffect(() => {
    setAPIKey(getOpenAIAPIKeyFromLocalStorage());
  }, []);

  return {
    apiKey,
    setAPIKey: useMemoizedCallback((newAPIKey: string | null) => {
      setAPIKey(newAPIKey);
      setOpenAIAPIKeyInLocalStorage(newAPIKey);
    }, []),
  };
}

function getOpenAIAPIKeyFromLocalStorage() {
  return window.localStorage.getItem(localStorageKey);
}

function setOpenAIAPIKeyInLocalStorage(apiKey: string | null) {
  if (apiKey) {
    return window.localStorage.setItem(localStorageKey, apiKey);
  }

  return window.localStorage.removeItem(localStorageKey);
}
