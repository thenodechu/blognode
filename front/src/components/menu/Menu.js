import React from "react";
import "./menu.css";
import { Link } from "react-router-dom";
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user:[""]};
    this.loginUser = this.loginUser.bind(this);
  }
  
  async loginUser() {
    let response = await fetch("http://localhost:8080/api/checkUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ jwt: localStorage.getItem("jwt")}),
    });
    let db = await response.json();
    this.setState({user:[db.name]});
    console.log(db.name);
  } 

  async componentDidMount() {
 
    await this.loginUser();
 
  }

 
  render() {
    return (
      <div className="">
        <ul className="menu">
          <Link to="/" className="logoLink">
            <li className="logo">News</li>
          </Link>

          <li className="item">Каталог</li>
          <li className="item notmain">Сохраненное</li>
          {
          
            this.state.user.map((item, index) => {
              if (item === "none") {
                return (
                  <li className="item regAuth push" key={index}>
                    <Link to="/signup" className="linkRegister">
                    Регистрация
                    </Link>
                  </li>
              
            )
              } else if(item.length === 0){
                return(<p  key={index} ></p>);
              }else {
                return (
                  <li className="item  push" key={index}>            
                    <ul className="usersList">
                      <li>
                          <div className="blockUser">
                            <div className="imgLeft">
                              <img src="https://i.pinimg.com/originals/11/a9/6c/11a96c6aede089826f798c48bf14b620.png" className="imgUser" width="40px" alt="" />
                            </div>
                            <div className="textName">
                              <Link className="linkUser" to="/userPage"><p>{item}</p></Link>
                            </div>
                          </div>
                      </li>
                    </ul>
                  </li>
            )
              }
              
                /*
                   <li className="item regAuth">
                      <Link to="/signin" className="linkAuth">
                        Авторизация
                      </Link>
                    </li>*/ 
            })
          }
            
        </ul>
      </div>
    );
  }
}

export default Menu;
