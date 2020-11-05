import React from "react";
import Menu from "../menu/Menu";
import BottomMenu from "../bottomMenu/BottomMenu";
import { Link } from "react-router-dom";
import "./main.css";
class Main extends React.Component {
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
    let result = await fetch("http://localhost:8080/api/content/none");
    let db = await result.json();
    await this.setState({ db: db });
  }

  async componentDidMount() {
    await this.getDb();
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
        <BottomMenu />

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
              <div className="blockNameOfArticle">
                <p className="descOfArticle">
                  {item.shortText}
                  <Link className="linkButton" to={"/article/?id=" + item._id + ""}>
                    <span className="readMore">Читать дальше</span>
                  </Link>
                </p>
              </div>
              {this.checkImg(item.shortImg)}
              <div className="userBlock">
                <div>
                  <img src={item.imgOfAuthor} width="50px" alt="" />
                </div>
                <div className="nameblock">
                  <p className="nameOfUser">
                    {item.nameOfAuthor}
                    <br></br>
                    <span className="dateOfarticle">25.02.52</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Main;
