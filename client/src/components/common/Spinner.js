import React from "react";
import { Container } from "reactstrap";

export default () => {
  return (
    <Container className="spinner">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </Container>
  );
};
