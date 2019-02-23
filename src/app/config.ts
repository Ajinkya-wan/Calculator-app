import { environment } from '../environments/environment';

function createConfig() {

  const AppConfig = {
    apiURL: environment.host+ '/api/v1',
  };
  return AppConfig;
}

export const APPCONFIG = createConfig();
