import * as crypto from "crypto";
import { promisify } from "util";
import * as mongodb from "mongodb";

import * as config from "../../config";
import { App } from "../../types";

const pbkdf2 = promisify(crypto.pbkdf2);

export default class UserModel {
  private users: mongodb.Collection;

  constructor(private app: App) {
    this.users = this.app.mongo.db.collection("users");
  }

  async create(userData: { email: string; password: string }) {
    const userSalt = await this.createSalt();
    const salt = config.salt + "." + userSalt;
    const password = await pbkdf2(userData.password, salt, 16000, 64, "sha512");

    const res = await this.users.insertOne({
      email: userData.email,
      salt,
      password,
    });

    return res.ops[0];
  }

  async find(userId: string): Promise<any> {
    const _id = new mongodb.ObjectId(userId);
    const userDoc = await this.users.findOne({ _id });
    return userDoc;
  }

  async update(userId: string, userData: any) {
    const _id = new mongodb.ObjectId(userId);
    await this.users.updateOne({ _id }, { $set: userData });
    // const newDoc = await this.users.findOneAndUpdate(
    //   { _id },
    //   { $set: userData },
    //   { returnOriginal: false }
    // );
    // return newDoc.value;
  }

  //
  // ===== private =====
  //

  private async createSalt() {
    const bytes = await promisify(crypto.randomBytes)(16);
    return bytes.toString("base64");
  }
}
