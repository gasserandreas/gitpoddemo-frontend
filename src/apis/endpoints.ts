export enum Environment {
  local = 'local',
  dev = 'dev',
  test = 'test',
  prod = 'prod',
};

export type Endpoint = {
  [Environment.local]: string,
  [Environment.dev]: string,
  [Environment.test]: string,
  [Environment.prod]: string,
}

const endpoints: {[key: string]: Endpoint} = {
  backend: {
    local: 'https://8888-gasserandre-gitpoddemob-pblixl60zko.ws-eu88.gitpod.io',
    dev: '',
    test: '',
    prod: '',
  },
};

export default endpoints;
