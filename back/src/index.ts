import app from "./app";

const { PORT = "3000", HOST = "0.0.0.0" } = process.env;

start().catch(handleError);

async function start() {
  await app.listen(parseInt(PORT), HOST);
  // services.log.info(`server is listening on ${services.server.address().port}`);
}

function handleError(err: Error) {
  app.log.error(err);
  process.exit(1);
}
