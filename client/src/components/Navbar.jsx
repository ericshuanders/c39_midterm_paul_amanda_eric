import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import dog from '../images/dog.jpg';

const Navigation = () => {
  return (
    <>
      <Navbar className='navDiv' collapseOnSelect expand='md'>
        <Navbar.Brand className='anchorDog' href="https://www.brewdog.com/usa/">
          <img className="brewdog" src={dog} alt="brew dog" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='mr-auto'>
              <Nav.Link className="link" href="/results">
                <h4>PAWYOUADRINK</h4>
              </Nav.Link>
              <Nav.Link className="link" href="/random" eventKey="link-1">
                <h4>Random Beer</h4>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        
      </Navbar>
    </>
   
  );
};

export default Navigation;
