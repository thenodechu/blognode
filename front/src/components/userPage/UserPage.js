import React from "react";
import Menu from "../menu/Menu";
import BottomMenu from "../bottomMenu/BottomMenu";
import { Link } from "react-router-dom";
import "./userPage.css";
class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: [],
    };
    this.getDb = this.getDb.bind(this);
    this.redirect = this.redirect.bind(this);
    this.checkImg = this.checkImg.bind(this);
  }
  async getDb() {
    let result = await fetch("http://localhost:8080/api/content/"+localStorage.getItem("jwt")+"");
    let db = await result.json();
    await this.setState({ db: db });
  }
/*
  async componentDidMount() {
     
      
  }*/


  async componentDidMount() {
    let response = await fetch("http://localhost:8080/api/checkUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
    },  
      body: JSON.stringify({ jwt: localStorage.getItem("jwt")}),
    });
    let db = await response.json();
    if (db.name === "none") {
      window.location.assign("/signin");
    } else {
        await this.getDb();
    }
    
  }

  redirect(id) {
    window.location.assign("http://localhost:3000/article/?id=" + id + "");
  }

  checkImg(src) {
    if (src !== "none") {
      return (
        <p className="centerImg">
          <img className="imgOfArcile" src={src} alt="" />
        </p>
      );
    }
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="titleMy">
            <p>Мои статьи</p>
        </div>
        {this.state.db.map((item, index) => {
          return (
            <div key={index} className="articleBlock">
              <div className="blockNameOfArticle">
                <p
                  className="nameOfArticle"
                  onClick={() => this.redirect(item._id)}
                >
                  {item.title}
                </p>
              </div>
              <div className="blockNameOfArticle">
                <p className="tagsOfArticle">{item.tags}</p>
              </div>
             
                <Link className="goToEdit" to={"/article/?id=" + item.nameOfAuthor + ""}>
                    <p>Редактировать</p>
                </Link>
           
            </div>
          );
        })}
      </div>
    );
  }
}

export default UserPage;
