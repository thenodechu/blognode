import React from "react";
import "./editor.css";
import Menu from "../menu/Menu";
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaVal: undefined,
      textArticle: ["none"]
    };

    this.editor = React.createRef();
    this.titleOfArticle = React.createRef();
    this.helpBlock = React.createRef();
    this.tags = React.createRef();
    this.bold = this.bold.bind(this);
    this.list = this.list.bind(this);
    this.italic = this.italic.bind(this);
    this.title = this.title.bind(this);
    this.image = this.image.bind(this);
    this.underline = this.underline.bind(this);
    this.link = this.link.bind(this);
    this.publish = this.publish.bind(this);
  }

  bold() {
    document.execCommand("bold");
  }
  list() {
    document.execCommand("insertOrderedList");
  }
  italic() {
    document.execCommand("italic");
  }

  title() {
    document.execCommand("formatBlock", false, "h3");
  }

  image() {
    let url = prompt("Введите адрес изображения", "");
    document.execCommand("insertImage", false, url);
  }
  underline() {
   document.execCommand("underline", false, null);
  }

  link() {
    var url = prompt("Введите URL", "");
    document.execCommand("CreateLink", false, url);
  }

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
    }
    
  }

  async publish() {
    this.helpBlock.current.innerHTML = this.editor.current.innerHTML;
    let checkImg = await document.querySelectorAll("div.getImg img")[0];
    let imgSrc;

    if (checkImg) {
      imgSrc = await checkImg.getAttribute("src");
    } else {
      imgSrc = "none";
    }

    let article = {
      title: this.titleOfArticle.current.value,
      tags: this.tags.current.value,
      nameOfAuthor: localStorage.getItem("name"),
      imgOfAuthor:
        "https://i.pinimg.com/originals/11/a9/6c/11a96c6aede089826f798c48bf14b620.png",
      contentOfArticle: this.editor.current.innerHTML,
      date: new Date(),
      shortText: this.editor.current.textContent.slice(0, 200) + "...",
      shortImg: imgSrc,
    };
    let response = await fetch("http://localhost:8080/api/post/article/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ article: article }),
    });

    this.editor.current.innerHTML = "";
    
    let result = await response.json();
    this.titleOfArticle.current.value="";
    this.tags.current.value="";
    this.setState({textArticle:[result]});
  }

  render() {
    return (
      <div>

        <Menu />
        <br />
        <div className="fixedBlock">
          <div className="helpblockForCenter">
            <ul className="menuEditor">
              <li>
                <button onClick={this.bold}>Жирный</button>
              </li>
              <li className="rightEdit">
                <button onClick={this.italic}>Курсив</button>
              </li>
              <li className="rightEdit">
                <button onClick={this.underline}>Подчеркивание</button>
              </li>
              <li className="rightEdit">
                <button onClick={this.title}>Загаловок</button>
              </li>
              <li className="rightEdit">
                <button onClick={this.list}>Список</button>
              </li>
              <li className="rightEdit">
                <button onClick={this.image}>Изображение</button>
              </li>
              <li className="rightEdit">
                <button onClick={this.link}>Гиперссылка</button>
              </li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="editorFieldCenter">
          <div
            className="editorField"
            ref={this.editor}
            contentEditable
            placeholder="Введите текст"
            spellCheck="false"
          ></div>
        </div>
        <br />
        <div className="centerBlockInput">
          <input
            ref={this.titleOfArticle}
            className="dataAboutArticle"
            type="text"
            placeholder="Заголовок"
          />
          <br />
          <input
            ref={this.tags}
            className="dataAboutArticle"
            type="text"
            placeholder="Теги"
          />
        </div>
        <br />
        <div className="buttonHelpBlock">
          <button className="saveArticle" onClick={this.publish}>
            Опубликовать
          </button>
        </div>
   
        <div>
            {this.state.textArticle.map((item,index)=>{
              if(item!=="none"){
                return (
                  <div className="resultMessage" key={index}>
                    <p>
                      {item}
                    </p>
                  </div>
                )
              }

            })}
        </div>
        <div className="getImg" ref={this.helpBlock} style={{ opacity: 0 },{display:"none"}}></div>
      </div>
    );
  }
}

export default Editor;
