import * as url from "url";
import * as mongodb from "mongodb";
import * as config from "../config";
import { App } from "../types";

interface IMongoPluginOpts {
  forceClose?: boolean;
  dbName?: string;
}

export default async function mongoPlugin(
  fastify: App,
  opts: IMongoPluginOpts,
  next: Function
) {
  try {
    const client = await mongodb.MongoClient.connect(config.mongo_url);

    fastify.addHook("onClose", _fastify => client.close(opts.forceClose));

    const dbNameFromUrl = new url.URL(config.mongo_url).pathname.slice(1);
    const dbName = dbNameFromUrl || opts.dbName || "cutedge-dev";
    const db = client.db(dbName);

    fastify.decorate("mongo", { client, db });
  } catch (err) {
    next(err);
  }
}
