import React from "react";
import { Link } from "react-router-dom";
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      valuePassword: "",
      valueEmail: "",
      error: { data: [] },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(event) {
    const { name, value } = event.target;
    await this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let user = {
      name: this.state.value,
      password: this.state.valuePassword,
    };

    let response = await fetch("http://localhost:8080/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ user: user }),
    });
    let db = await response.json();
    if (db.data[0] === "Успех") {
      await localStorage.setItem("jwt", db.token);
      await localStorage.setItem("name", db.name);
      window.location.assign("/");
    } else {
      await this.setState({ error: db });
    }
   

  
  }

  render() {
    const { value, valuePassword, valueEmail } = this.state;
    return (
      <div className="signupBlock">
        {this.state.error.data.map((element,index) => {
          if (element === "Успех") {
            return (
              <div className="success" key={index}>
                <p>{element}</p>
              </div>
            );
          } else {
            return (
              <div className="error" key={index}>
                <p>{element}</p>
              </div>
            );
          }
        })}
        <form onSubmit={this.handleSubmit}>
          <p className="auth">Авторизация</p>
          <p className="havenoaccount">Нет аккаунта? <Link to={"/signup"} className="authButton">Регистрация</Link> </p>

          <input
            className="styleInput"
            type="text"
            placeholder="Имя"
            name="value"
            value={value}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input
            type="text"
            className="styleInput"
            placeholder="Пароль"
            name="valuePassword"
            value={valuePassword}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input className="button" type="submit" value="Войти" />
        </form>
      </div>
    );
  }
}

export default Signin;
