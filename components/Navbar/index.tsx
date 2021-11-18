import React from 'react';
import { Navbar, Container, Nav, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap';
import Link from 'next/link';

const WAVE_OPTICS_NAME = 'ВОЛНОВАЯ ОПТИКА';

import { LAB_1_NAME, LAB_2_NAME, LAB_3_NAME, LAB_4_NAME, LAB_5_NAME } from 'names/navbar.name';

const sections = [
  { title: LAB_1_NAME, url: '/lab1' },
  { title: LAB_2_NAME, url: '/lab2' },
  { title: LAB_3_NAME, url: '/lab3' },
  { title: LAB_4_NAME, url: '/lab4' },
  { title: LAB_5_NAME, url: '/lab5' },
];

import classes from '../Navbar/navbar.module.scss';

export default function Navbar2() {
  const [currentPage, setCurrentPage] = React.useState(0);

  return (
    <Navbar className="shadow-sm" variant="dark" bg="primary" expand="lg">
      <Container fluid>
        <Navbar.Brand className={classes.logo} href="/">
          {WAVE_OPTICS_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <DropdownButton
              className={classes.dropDownTitle}
              id="dropdown-item-button"
              title="Выбор лабораторной"
            >
              {sections.map((section, index) => (
                <Link key={section.title + index} href={section.url} passHref>
                  <Dropdown.Item
                    className={(currentPage == index ? ' active' : '') + ' ' + classes.dropDownItem}
                  >
                    {section.title}
                  </Dropdown.Item>
                </Link>
              ))}
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
