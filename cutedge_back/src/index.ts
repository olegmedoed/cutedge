import app from "./app";

const { PORT = "3000", HOST = "0.0.0.0" } = process.env;

start().catch(handleError);

async function start() {
  await app.listen(parseInt(PORT), HOST);
  app.log.info(`Server start on port: ${PORT} and host ${HOST}`);
}

function handleError(err: Error) {
  app.log.error("ERROR: ", err);
  process.exit(1);
}
