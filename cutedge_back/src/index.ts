import config from "./config";
import app from "./app";

start().catch(handleError);

async function start() {
  await app.listen(config.port, config.host);
  app.log.info(`Server start on port: ${config.port} and host ${config.host}`);
}

function handleError(err: Error) {
  app.log.error("ERROR: ", err);
  process.exit(1);
}
