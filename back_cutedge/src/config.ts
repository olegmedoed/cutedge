import * as path from "path";
import * as fs from "fs";

const env = process.env;
const rootDir = process.cwd();
const credentials = getCredentialsFromFile();

export const port = parseInt(env.PORT || "3000");
export const host = env.HOST || "0.0.0.0";
export const mongo_url = env.MONGO_URL || "mongodb://mongo/cutedge-dev";
export const salt = credentials.salt || env.SALT || "super secret";

//
// ===== where =====
//

function getCredentialsFromFile() {
  if (!env.CUTEDGE_CREDS) {
    return {};
  }

  try {
    const credentialsString = fs.readFileSync(
      path.resolve(rootDir, env.CUTEDGE_CREDS),
      { encoding: "utf: 8" }
    );
    const credentials = JSON.parse(credentialsString);
    return credentials;
  } catch (err) {
    console.error(err.message);
    return {} as any;
  }
}
