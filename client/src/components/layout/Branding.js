import React from "react";
import { Container, Navbar, NavbarBrand } from "reactstrap";

export default () => {
  return (
    <Navbar color="dark" dark expand={true}>
      <Container>
        <NavbarBrand href="/">photo search</NavbarBrand>
      </Container>
    </Navbar>
  );
};
