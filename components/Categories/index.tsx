import React from 'react';

import classes from './categories.module.scss';
import { LAB_1_NAME, LAB_2_NAME, LAB_3_NAME, LAB_4_NAME } from 'names/navbar.name';

const sections = [
  { title: LAB_1_NAME, url: '/lab1', isActive: 'false' },
  { title: LAB_2_NAME, url: '/lab2', isActive: 'false' },
  { title: LAB_3_NAME, url: '/lab3', isActive: 'false' },
  { title: LAB_4_NAME, url: '/lab4', isActive: 'false' },
];

interface Props {}
const Categories: React.FC<Props> = ({}) => {

  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <>
      <div className={classes.topnav}>
        {sections.map((section, index) => (
            <a key={section.title} className={(currentPage == index ? " active" : "")}
               href={section.url}>{section.title}</a>
        ))}
      </div>
    </>
  );
};
export default Categories;
