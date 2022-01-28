import React from 'react';
import { DropdownButton, Dropdown, Navbar, NavDropdown, Nav } from 'react-bootstrap';
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

import classes from './header.module.scss';

export default function Header(): JSX.Element {
    const [currentPage, setCurrentPage] = React.useState(0);

    return (
        <div>
            <div className={classes.parentUp}>

                {/* <Link href="/">
                    <a className={classes.logo}>Теория</a>
                </Link> */}
                <nav className={classes.navbar}>
                    <Link href="/">
                        <a className={classes.logo}>{WAVE_OPTICS_NAME}</a>
                    </Link>


                    {/* <label htmlFor="lab">Выбор лабораторной:</label>
                    <select name="lab" id="lab">
                        <option value="free">Free</option>
                        <option value="bronze">Bronze</option>
                        <option value="silver" selected>Silver</option>
                        <option value="Gold">Gold</option>
                    </select> */}

                    <Nav>
                        <NavDropdown
                            className={classes.dropDownTitle}
                            id="nav-dropdown-dark-example"
                            title="Выбор лабораторной"
                            menuVariant="light"
                        >
                            {sections.map((section, index) => (
                                <Link key={section.title + index} href={section.url} passHref>
                                    <NavDropdown.Item
                                        className={(currentPage == index ? ' active' : '') + ' ' + classes.dropDownItem}
                                    >
                                        {section.title}
                                    </NavDropdown.Item>
                                </Link>
                            ))}
                        </NavDropdown>
                    </Nav>

                    {/* <DropdownButton
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
                    </DropdownButton> */}
                </nav>
            </div>
            <div className={classes.parent}>
                <Link href="/">
                    <a className={classes.logo}>Теория</a>
                </Link>
                <div className={classes.verticalLine}></div>
                <Link href="/">
                    <a className={classes.logo}>Модель</a>
                </Link>
            </div>
        </div>
    );
}
