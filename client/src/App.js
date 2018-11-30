import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";
// import TopNav from "./components/TopNav";
// import Results from "./components/Results";
// import Settings from "./components/Settings";
// import Full from "./components/Full";
// import AddPost from "./components/AddPost";
// import PopOver from "./components/PopOver";
// import Notifications from "./components/Notifications";

import {
  faCalendarAlt,
  faTags,
  faEnvelope,
  faCog,
  faTrashAlt,
  faSearch,
  faUserCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

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
      faTimes
    );
  }
  render() {
    return (
      <Fragment>
        <Container>hello</Container>
        {/* <Notifications
          type="info"
          message="this is the message"
          title="this is the title"
        />
        <PopOver showModal={false} />
        <TopNav />
        <Container fluid={true} id="main">
          <AddPost showMenu={false} />
          <Results />
          <Settings />
          <Full />
        </Container> */}
      </Fragment>
    );
  }
}

export default App;
