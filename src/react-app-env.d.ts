declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_BASE_URL: string;
    readonly REACT_APP_AWS_NAME: string;
    readonly REACT_APP_AWS_REGION: string;
    readonly REACT_APP_AWS_ACCESS_KEY: string;
    readonly REACT_APP_AWS_SECRET_KEY: string;
  }
}
