import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt from "jwt-simple";
import { Container } from "reactstrap";

import PrivateRoute from "./components/common/PrivateRoute";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//templates
import Landing from "./components/layout/Landing";
// import Branding from "./components/layout/Branding";
import TopNav from "./components/layout/TopNav";

import NotFound from "./components/not-found/NotFound";
import Post from "./components/post/Post";
import AddPost from "./components/post/AddPost";
import Results from "./components/results/Results";
import Settings from "./components/settings/Settings";
import RedirectId from "./components/redirect/RedirectId";

import Notifications from "./components/common/Notifications";
import PopOver from "./components/common/PopOver";

import { JWT_KEY } from "./utils/constants";

// import { clearCurrentProfile } from "./actions/profileActions";

import {
  faCalendarAlt,
  faTags,
  faEnvelope,
  faCog,
  faTrashAlt,
  faSearch,
  faUserCircle,
  faTimes,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Check for token
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   setAuthToken(localStorage.jwtToken);
//   // Decode token and get user info and exp
//   const decoded = jwt.decode(localStorage.jwtToken, JWT_KEY);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));

//   // Check for expired token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     // Logout user
//     console.log("logout app");
//     store.dispatch(logoutUser());

//     // Redirect to login
//     window.location.href = "/";
//     alert("please log in");
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);

    library.add(
      fab,
      faCalendarAlt,
      faTags,
      faEnvelope,
      faCog,
      faTrashAlt,
      faSearch,
      faUserCircle,
      faTimes,
      faSignOutAlt
    );
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Notifications
              type="info"
              message="this is the message"
              title="this is the title"
            />
            <PopOver showModal={false} />
            {/* <Branding /> */}
            <TopNav />
            <AddPost />
            <Container fluid={true} id="main">
              <Switch>
                {/* <Route exact path="/r/:id" component={RedirectId} />
                <Route exact path="/" component={Landing} />
                <Route exact path="/post/:id" component={Post} />
                <Route exact path="/posts/details/query" component={Results} />
                <Route exact path="/posts/user/:id" component={Results} />
                <Route exact path="/posts/tag/:tag" component={Results} />
                <PrivateRoute exact path="/add-post" component={AddPost} />
                <PrivateRoute exact path="/settings" component={Settings} /> */}
                <Route exact component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
