import React, { ReactNode, useState, useRef } from 'react';
import useOnClickOutside from './useOnClickOutside';
import styles from './Select.module.scss';

const Select: React.FC<{
  children: ReactNode | ReactNode[];
  defaultValue?: string;
  placeholder?: string;
}> = ({ children, defaultValue, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownHandler = () => setShowDropdown(!showDropdown);
  const selectPlaceholder = placeholder || 'Choose an lab';
  const selectContainerRef = useRef(null);

  const clickOutsideHandler = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, clickOutsideHandler);

  return (
    <>
      <label htmlFor='select' className={styles.label}>
        {'ВЫБОР ЛАБОРАТОРНОЙ - - - >'}
      </label>
      <div
        id='select'
        className={styles.selectContainer}
        ref={selectContainerRef}
      >
        <div
          className={
            showDropdown ? `${styles.selectedText} active` : styles.selectedText
          }
          onClick={showDropdownHandler}
        >
          <span>
            {selectedOption.length > 0 ? selectedOption : selectPlaceholder}
          </span>

          <svg
            width='8'
            height='7'
            className={showDropdown ? styles.rotated : ''}
          >
            <path d='M 0 0 L 4 7 L 8 0 z' fill='white' />
          </svg>
        </div>
        <ul
          className={
            showDropdown
              ? `${styles.selectOptions} ${styles.showDropdownOptions}`
              : `${styles.selectOptions} ${styles.hideDropdownOptions}`
          }
        >
          {children}
        </ul>
      </div>
    </>
  );
};

export default Select;
