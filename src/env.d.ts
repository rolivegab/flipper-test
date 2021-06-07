type EnvTypes =
  | "USERNAME"
  | "PASSWORD"
  | "LEGENDAS_TV_URL"
  | "REFRESH_MHTML_FILES"
  | "MAX_PAGES_PER_TITLE"
  | "RABBITMQ_URL";

declare namespace NodeJS {
  export type ProcessEnv = {
    [K in EnvTypes]: string;
  } & {
    NODE_ENV: "development" | "production";
  };
}
