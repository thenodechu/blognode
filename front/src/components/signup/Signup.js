import React from "react";
import "./signupBlock.css";
import { Link } from "react-router-dom";
class Signup extends React.Component {
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
      email: this.state.valueEmail,
    };

    let response = await fetch("http://localhost:8080/api/post/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ user: user }),
    });
    let db = await response.json();
    await this.setState({ error: db });
    
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
          <p className="auth">Регистрация</p>
          <p className="havenoaccount">Есть аккаунта? <Link to={"/signin"} className="authButton">Авторизация</Link></p>

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
          <input
            className="styleInput"
            placeholder="Email"
            type="text"
            name="valueEmail"
            value={valueEmail}
            onChange={this.handleChange}
          />
          <br />
          <br />

          <input className="button" type="submit" value="Зарегистрироваться" />
        </form>
      </div>
    );
  }
}

export default Signup;
