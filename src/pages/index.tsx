import { Select, Option } from 'components';
import React, { useState } from 'react';

const App: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<String>('blue');

  // This function is triggered when the select changes
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <div style={styles.container}>
      <select onChange={selectChange} style={styles.select}>
        <option style={styles.option} value='blue'>
          Blue
        </option>
        <option style={styles.option} value='red'>
          Red
        </option>
        <option style={styles.option} value='green'>
          Green
        </option>
        <option style={styles.option} value='yellow'>
          Yellow
        </option>
        <option style={styles.option} value='kindacode.com'>
          Kindacode.com
        </option>
      </select>
      {selectedOption && <h2 style={styles.result}>{selectedOption}</h2>}
    </div>
  );
};

// Just some styles
const styles: { [name: string]: React.CSSProperties } = {
  container: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  select: {
    padding: 5,
    width: 'max-content',
    border: 'none',
  },
  result: {
    marginTop: 30,
  },
  option: {
    padding: '1rem !important',
  },
};

export default function Index() {
  return (
    <>
      <Select placeholder='Choose an option'>
        <Option value='one'>One</Option>
        <Option value='two'>Two</Option>
        <Option value='three'>Three</Option>
        <Option value='four'>Four</Option>
      </Select>
      <App />
    </>
  );
}
