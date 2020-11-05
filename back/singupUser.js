class SingUp {
  constructor(dataAboutUser) {
    this.md = require('md5');
    this.Users = require("./models/users").Users;
    this.dataAboutUser = dataAboutUser;
    this.checkValueFromUser = 1;
    this.errors = [];
  }

  async _searchName() {
    let name = await this.Users.find({ name: this.dataAboutUser.name });
    if (name.length !== 0) {
      this.checkValueFromUser -= 1;
      this.errors.push("Пользователь с таким именем уже есть");
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
        this.dataAboutUser.password.length < 5) ||
      (this.dataAboutUser.email.length >= 0 &&
        this.dataAboutUser.email.length < 5)
    ) {
      this.checkValueFromUser -= 1;
      this.errors.push("Что-то не так, попробуйте ввести новые данные");
    }
  }

  async _hashPassword() {

    let hash = await this.md(this.dataAboutUser.password);
    return hash;
  }

  async resultSingup() {
    await this._searchName();
    await this._checkXss(this.dataAboutUser.name);
    await this._checkXss(this.dataAboutUser.email);
    await this._checkXss(this.dataAboutUser.password);
    await this._checkLenght();
    if (this.checkValueFromUser === 1) {
      this.Users.collection.insertOne({
        name: this.dataAboutUser.name,
        email: this.dataAboutUser.email,
        password: await this._hashPassword(this.dataAboutUser.password),
      });
      return { check: true };
    } else {
      return { check: false, errors: this.errors };
    }
  }
}

module.exports = SingUp;
