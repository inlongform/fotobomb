import React from "react";
import { Container, Row, Col } from "reactstrap";

export default () => {
  return (
    <Container style={{ marginTop: "40px" }} className="text-center">
      <Row>
        <Col>
          <h1 className="display-4">Page Not Found</h1>
          <p>Sorry, this page does not exist</p>
        </Col>
      </Row>
    </Container>
  );
};
