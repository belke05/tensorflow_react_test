import React from "react";
import { NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navigation(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          src="https://miro.medium.com/max/4000/1*ockRxLunwRDQI89eiiNlUA.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        {"    "}
        Tensor Flow JS
      </Navbar.Brand>
    </Navbar>
  );
}
