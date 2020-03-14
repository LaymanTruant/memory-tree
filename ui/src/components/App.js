import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
// import Header from "./Header";
import history from "../history";
import ImageCardList from "./imageCards/ImageCardList";
import ImageCardCreate from "./imageCards/ImageCardCreate";
import ImageCardEdit from "./imageCards/ImageCardEdit";
import ImageCardDelete from "./imageCards/ImageCardDelete";
import ImageCardShow from "./imageCards/ImageCardShow";

class App extends Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: "50px" }}>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" exact component={ImageCardList} />
              <Route path="/imageCards/new" exact component={ImageCardCreate} />
              <Route
                path="/imageCards/edit/:id"
                exact
                component={ImageCardEdit}
              />
              <Route
                path="/imageCards/delete/:id"
                exact
                component={ImageCardDelete}
              />
              <Route path="/imageCards/:id" exact component={ImageCardShow} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
