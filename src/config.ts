import assert from "assert";
import { config } from "dotenv";

config({
  path: ".env",
});

const envs: Array<EnvTypes> = [
  "USERNAME",
  "PASSWORD"
]

envs.forEach((i) => {
  assert(process.env[i], `env ${i} is required`);
});
