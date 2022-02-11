import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
// import FormControl from "react-bootstrap/FormControl";

import styles from './dropdown.module.scss';

// interface IFruity {
//     id: number;
//     fruit: string;
//     prefix: string;
//     suffix?: string;
// }

import {
  LAB_1_NAME,
  LAB_2_NAME,
  LAB_3_NAME,
  LAB_4_NAME,
  LAB_5_NAME,
} from 'names/navbar.name';
import Link from 'next/link';

const sections = [
  { title: LAB_1_NAME, url: '/lab1' },
  { title: LAB_2_NAME, url: '/lab2' },
  { title: LAB_3_NAME, url: '/lab3' },
  { title: LAB_4_NAME, url: '/lab4' },
  { title: LAB_5_NAME, url: '/lab5' },
];

// const fruits: IFruity[] = [
//     { id: 1, fruit: "Apples", prefix: "How's about them " },
//     { id: 2, fruit: "Pear", prefix: "A cracking ", suffix: "!" },
//     { id: 3, fruit: "Oranges", prefix: "What rhymes with ", suffix: "?" },
//     { id: 4, fruit: "Banana", prefix: "Fruit flies like a " },
//     { id: 5, fruit: "Coconuts", prefix: "Oh what a lovely bunch of " },
//     { id: 6, fruit: "Avocado", prefix: "Is an ", suffix: " even a fruit?" }
// ];

type CustomToggleProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(
  (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
    <a
      href=''
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      {props.children}
      <span className={styles.sign}>&#x25bc;</span>
    </a>
  )
);

type CustomMenuProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  labeledBy?: string;
};

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  (props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {
    // const [value, setValue] = useState('');

    const value = '';

    return (
      <div
        ref={ref}
        style={props.style}
        className={props.className + ' ' + styles.list}
        aria-labelledby={props.labeledBy}
      >
        {/* <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={e => setValue(e.target.value)}
                    value={value}
                /> */}
        <ul className={'list-unstyled ' + styles.list}>
          {React.Children.toArray(props.children).filter(
            (child: any) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

const DropdownSelector = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  console.log(selectedItem);
  // const theChosenFruit = () => {
  //     const chosenFruit: IFruity = fruits.find(f => f.id === selectedItem) || { id: -1, fruit: "ВЫБОР ЛАБОРАТОРНОЙ", prefix: "" };
  //     return chosenFruit
  //         ? chosenFruit.prefix + chosenFruit.fruit + (chosenFruit.suffix || "")
  //         : "Select a fruit";
  // };

  return (
    <Dropdown
      className={styles.all}
      onSelect={(eventKey: string | null) => setSelectedItem(Number(eventKey))}
    >
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        {/* {theChosenFruit()} */}
        ВЫБОР ЛАБОРАТОРНОЙ РАБОТЫ
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {sections.map((section, index) => {
          return (
            <Dropdown.Item key={section.url} eventKey={index.toString()}>
              {/* {fruit.fruit} */}
              <Link href={section.url}>{section.title}</Link>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownSelector;
