import assert from "assert";
import { config as dotEnvConfig } from "dotenv";

export const config = () => {
  dotEnvConfig({
    path: ".env",
  });

  const envs: Array<EnvTypes> = [
    "USERNAME",
    "PASSWORD"
  ]

  envs.forEach((i) => {
    assert(process.env[i], `env ${i} is required`);
  });
}
