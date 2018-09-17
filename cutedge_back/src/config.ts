import * as fs from "fs";
import { promisify } from "util";

const env = process.env;
const readFile = promisify(fs.readFile);
const config = getConfigFromFile();

export default {
  port: parseInt(env.PORT || "3000"),
  host: env.HOST || "0.0.0.0",
  mongo_url: env.MONGO_URL || "mongodb://mongo/cutedge-dev",
  salt: env.SALT || "super secret",
  ...config,
};

async function getConfigFromFile() {
  if (!env.CONFIG_FILE) {
    return {};
  }

  try {
    const configString = await readFile(env.CONFIG_FILE, {
      encoding: "utf: 8",
    });
    const config = JSON.parse(configString);
    return config;
  } catch (err) {
    console.error(err.message);
    return {};
  }
}
