type EnvTypes = "USERNAME" | "PASSWORD" | "LEGENDAS_TV_URL";

declare namespace NodeJS {
  export type ProcessEnv = {
    [K in EnvTypes]: string;
  } & {
    NODE_ENV: "development" | "production";
  };
}
