
class SingIn {
  constructor(dataAboutUser) {
    this.md = require('md5');
    this.Users = require("./models/users").Users;
    this.Log = require("./models/log").Log;
    this.dataAboutUser = dataAboutUser;
    this.checkValueFromUser = 1;
    this.errors = [];
    this.jwt = require('jsonwebtoken'); 
  }

  async _searchName() {
    let name = await this.Users.find({ name: this.dataAboutUser.name });
    if (name.length === 0) {
      this.checkValueFromUser -= 1;
      this.errors.push("Пользователя с таким именем нет");
    }
  }

  _checkXss(str) {
    let db = [
      "<",
      ">",
      "/",
      "[",
      "]",
      "(",
      "{",
      "}",
      ")",
      "*",
      "&",
      "^",
      "%",
      "$",
      "#",
      "!",
      "?",
      "`",
      "~",
      ":",
    ];
    for (let item = 0; item < db.length; item++) {
      if (str.indexOf(db[item]) !== -1) {
        this.checkValueFromUser -= 1;
        this.errors.push("Неправильный формат данных");
        break;
      }
    }
  }

   _checkLenght() {
    if (
      (this.dataAboutUser.name.length >= 0 &&
        this.dataAboutUser.name.length < 3) ||
      (this.dataAboutUser.password.length >= 0 &&
        this.dataAboutUser.password.length < 5)
    ) {
      this.checkValueFromUser -= 1;
      this.errors.push("Что-то не так, попробуйте ввести новые данные");
    }
  }

  async _hashPassword() {
    let hash = await this.md(this.dataAboutUser.password);
    return hash;
  }

  async resultSingin() {
    await this._searchName();
    await this._checkXss(this.dataAboutUser.name);
    await this._checkXss(this.dataAboutUser.password);
    await this._checkLenght();
    
   
      
    let check = await this._hashPassword();
    let dataFromDb = await this.Users.findOne({ name: this.dataAboutUser.name });
  
    if (dataFromDb.password === check) {
      let token = await this.jwt.sign({ name: dataFromDb.name }, 'secret_key');
      await this.Log.collection.createIndex( { "createdAt": Math.round(Math.random()*1000000) }, { expireAfterSeconds:3600 } )
      await this.Log.collection.insertOne({
        "createdAt": new Date(),
        "name":dataFromDb.name,
        "logMessage": token
      });
      let make = await this.Log.find();
      console.log(make);
      return { check: true, token:token,name:dataFromDb.name};
    } else {
        return { check: false, errors: this.errors };
    }
  }
}

module.exports = SingIn;
