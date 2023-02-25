import endpoints, { Environment } from './endpoints';

type NetworkConfig = {
  method: string,
  mode: RequestMode,
  headers: {},
  body?: string,
};

export const defaultConfig: NetworkConfig = {
  method: 'GET',
  mode: 'cors',
  headers: {
    Accept: 'application/json;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
};

export const getEnv = () => {
  const url = window.location.href.toLowerCase();

  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    return Environment.local;
  }

  return Environment.prod;
};

export function getUrl(key: string, env?: Environment) {
  const endpoint = endpoints[key];
  return endpoint[env || getEnv()];
}

export function genericFetch(url: string, config?: NetworkConfig) {
  const mergedConfig: NetworkConfig = {
    ...defaultConfig,
    ...config,
  };
  return fetch(url, mergedConfig);
}

export function genericJsonFetch(url: string, config?: NetworkConfig) {
  return genericFetch(url, config)
    .then((response) => response.json());
}
