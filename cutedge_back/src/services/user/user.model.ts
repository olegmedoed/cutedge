//import crypto from "crypto";
//import * as mongodb from "mongodb";
//
//import { App } from "../../types";
//
//export default class UserModel {
//  private db: mongodb.Db;
//  private users: mongodb.Collection;
//
//  constructor(app: App) {
//    this.db = app.mongo.db;
//    this.users = this.db.collection('users');
//  }
//
//  create(userData: {email: string; password: string}) {
//    const password = crypto.pbkdf2(userData.password)
//
//  }
//}
