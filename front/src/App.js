import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Editors from "./components/editor/Editor";
import Main from "./components/main/Main";
import Article from "./components/article/Article";
import UserPage from "./components/userPage/UserPage";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Singin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/editor" component={Editors} />
          </Switch>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
          <Switch>
            <Route exact path="/article/" component={Article} />
          </Switch>
          <Switch>
            <Route exact path="/signup/" component={Signup} />
          </Switch>
          <Switch>
            <Route exact path="/signin/" component={Signin} />
          </Switch>
          <Switch>
            <Route exact path="/userPage/" component={UserPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
