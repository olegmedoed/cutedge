import * as fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const config = getConfigFromFile();
const env = process.env;

export default {
  mongo_url: env.MONGO_URL || "mongodb://localhost/cutedge_db",
  salt: env.SALT || "super secret",
  ...config,
};

async function getConfigFromFile() {
  const CONFIG_FILE = env.CONFIG_FILE;

  if (!CONFIG_FILE) {
    return {};
  }

  try {
    const configString = await readFile(CONFIG_FILE, { encoding: "utf: 8" });
    const config = JSON.parse(configString);
    return config;
  } catch (err) {
    console.error(err.message);
    return {};
  }
}
