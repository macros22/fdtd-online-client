import React from 'react';
import {Navbar, Container, Nav, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap';


// import { Categories } from 'components';
const WAVE_OPTICS_NAME = 'ВОЛНОВАЯ ОПТИКА';


import { LAB_1_NAME, LAB_2_NAME, LAB_3_NAME, LAB_4_NAME, LAB_5_NAME } from 'names/navbar.name';

const sections = [
  { title: LAB_1_NAME, url: '/lab1', isActive: 'false' },
  { title: LAB_2_NAME, url: '/lab2', isActive: 'false' },
  { title: LAB_3_NAME, url: '/lab3', isActive: 'false' },
  { title: LAB_4_NAME, url: '/lab4', isActive: 'true' },
  { title: LAB_5_NAME, url: '/lab5', isActive: 'false' },
];

import classes from '../Categories/categories.module.scss';

export default function Navbar2() {

  const [currentPage, setCurrentPage] = React.useState(1);

  return (


<Navbar variant="dark" bg="primary" expand="lg">
  <Container fluid>
    <Navbar.Brand href="/">{WAVE_OPTICS_NAME}</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-dark-example" />
    <Navbar.Collapse id="navbar-dark-example">
      <Nav>
        <NavDropdown
          id="nav-dropdown-dark-example"
          title="Выбор лабораторной"
          menuVariant="dark"
        >
           {sections.map((section, index) => (
             <NavDropdown.Item
              key={section.title}
              href={section.url}
              className={currentPage == index ? ' active' : ''}>
                 {section.title}
              </NavDropdown.Item>
              
        
        ))}
      
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>

        <DropdownButton id="dropdown-item-button" title="Выбор лабораторной">
          {/* <Dropdown.ItemText>Выбор лабораторной</Dropdown.ItemText> */}
        
          {sections.map((section, index) => (
             <Dropdown.Item
              key={section.title}
              href={section.url}
              className={currentPage == index ? ' active' : ''}>
                 {section.title}
              </Dropdown.Item>
        ))}
      </DropdownButton>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}
