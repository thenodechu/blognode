import React from "react";
import Menu from "../menu/Menu";
import "./article.css";
class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: [],
    };
    this.getDb = this.getDb.bind(this);
  }
  async getDb() {
    let result = await fetch(
      "http://localhost:8080/api/article/" +
        this.props.location.search.slice(4, this.props.location.search.length) +
        ""
    );
    let db = await result.json();
    await this.setState({ db: db[0] });
  }

  async componentDidMount() {
    await this.getDb();
  }
  render() {
    return (
      <div>
        <Menu />
        <div className="helpBlockForTitle">
          <p className="titleMainArticle">{this.state.db.title}</p>
        </div>

        <p className="titleMainTags">{this.state.db.tags}</p>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.db.contentOfArticle }}
          className="mainContent"
        ></div>
      </div>
    );
  }
}

export default Article;
