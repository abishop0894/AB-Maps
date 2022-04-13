import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "mapbox-gl/dist/mapbox-gl.css";
import Maps from "./components/Map";
import * as React from "react";
import { createContext } from "react";
const Context = createContext("");

const Application = () => {
  return (
    <div>
      <header>
        <Container fluid>
          <Navbar expand="fluid" variant="light" id="navbar">
            <Container>
              <Navbar.Brand href="#">
                <h2 className="logo">AB</h2>
              </Navbar.Brand>
            </Container>{" "}
          </Navbar>
        </Container>
      </header>
      <Context.Provider
        value={{
          results: [
            { latitude: -119.99959421984575, longitude: 38.619551620333496 },
          ],
        }}
      >
        <div className="map">
          <Maps></Maps>
        </div>
      </Context.Provider>
    </div>
  );
};

export { Application, Context };

//FUTURE BUILD: to include a feature that will fly to the logittude + latitude
//coordinates and have a compononent pop up that will show date time and local weather + news
// make sure to include functionality that will set correct perspective
