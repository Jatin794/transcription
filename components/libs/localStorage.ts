const localStorageKey = 'openAIAPIKey';

export function getOpenAIAPIKeyFromLocalStorage() {
  return window.localStorage.getItem(localStorageKey);
}

export function setOpenAIAPIKeyInLocalStorage(apiKey: string) {
  return window.localStorage.setItem(localStorageKey, apiKey);
}
