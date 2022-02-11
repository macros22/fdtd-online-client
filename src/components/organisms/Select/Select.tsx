import React, { ReactNode, useState, useRef } from 'react';
import useOnClickOutside from './useOnClickOutside';
import { SelectContext } from './selectContext';
import styles from './Select.module.scss';

const Select: React.FC<{
  children: ReactNode | ReactNode[];
  defaultValue?: string;
  placeholder?: string;
}> = ({ children, defaultValue, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownHandler = () => setShowDropdown(!showDropdown);
  const selectPlaceholder = placeholder || 'Choose an option';
  const selectContainerRef = useRef(null);

  const clickOutsideHandler = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, clickOutsideHandler);

  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <SelectContext.Provider
      value={{ selectedOption, changeSelectedOption: updateSelectedOption }}
    >
      <div className={styles.selectContainer} ref={selectContainerRef}>
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
            className={showDropdown ? styles.rotated : ''}
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
              fill='white'
            />
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
    </SelectContext.Provider>
  );
};

export default Select;
