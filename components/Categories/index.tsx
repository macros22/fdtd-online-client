import React from 'react';

import Button from '@material-ui/core/Button';
import { ButtonGroup } from "@material-ui/core";

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
  return (
    <>
        <div className={classes.sections}>
          {sections.map((section) => (
            <ButtonGroup key={section.title} size="small"  variant="text" aria-label="text button group">
              <Button
                href={section.url}>
                {section.title}
              </Button>
            </ButtonGroup>
          ))}
        </div>
    </>
  );
};
export default Categories;
