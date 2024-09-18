import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiFillDollarCircle,
  AiFillIdcard ,
  AiFillBank 
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

import logo from "../../assets/images/logo.png";

import { useAccount } from 'wagmi';
import useContractInfo from "../../hooks/useContractInfo";

function NavBar() {
  const { isConnected,address } = useAccount();
  const { owner } = useContractInfo();
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  const isOwner = address === owner;

  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY >= 20) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    }

    window.addEventListener("scroll", scrollHandler);

    // Limpieza para evitar fugas de memoria
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []); // Dependencia vacía para asegurarnos de que solo se ejecute una vez

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="FiveBloks!" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">

            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> QuiniBlock
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/play"
                onClick={() => updateExpanded(false)}
              >
                <AiFillDollarCircle   style={{ marginBottom: "2px" }} /> Jugar
              </Nav.Link>
            </Nav.Item>

            { isOwner &&
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/admin"
                  onClick={() => updateExpanded(false)}
                  style={{ color: "green !important" }}
                >
                  <AiFillBank style={{ marginBottom: "2px", color:"green" }} /> Administrar
                </Nav.Link>
              </Nav.Item>
            }
            {/* FUNCIONALIDAD FUTURA
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/memberships"
                onClick={() => updateExpanded(false)}
              >
                <AiFillIdcard  style={{ marginBottom: "2px" }} /> Membresias
              </Nav.Link>
            </Nav.Item> */}
            {/* AL CONECTARME VEO EL HISTORIAL */}
            {isConnected &&
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/history"
                  onClick={() => updateExpanded(false)}
                >
                  <CgFileDocument style={{ marginBottom: "2px" }} /> Historial
                </Nav.Link>
              </Nav.Item>
            }


            <Nav.Item className="fork-btn">
              {/* Este es el boton para conectarse y desconectarse de web3 */}
              <w3m-button className="purple" />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
