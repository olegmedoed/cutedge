import app from "./app"

const { PORT = '3000' } = process.env;

start().catch(handleError);

async function start() {
  await app.listen(PORT);
  // services.log.info(`server is listening on ${services.server.address().port}`);
}

function handleError(err: Error) {
  app.log.error(err);
  process.exit(1);
}
