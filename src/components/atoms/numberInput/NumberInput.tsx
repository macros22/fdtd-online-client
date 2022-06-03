import * as React from "react";
import WithLabel from "../withLabel/WithLabel";
import styles from "./NumberInput.module.scss";
import { NumberInputProps } from "./NumberInput.props";

// How to style arrows.
// https://snipp.ru/html-css/input-type-number
// https://codepen.io/komarovdesign/pen/PPRbgb

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  label,
  onChange,
  readOnly = false,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const plusBtnHandler = () => {
    if (inputRef.current) {
      triggerInputChange(inputRef.current, (+value + 1).toString());
    }
  };

  const minusBtnHandler = () => {
    // if (inputRef.current) {
    //   inputRef.current.stepDown();
    // }
    if (inputRef.current) {
      triggerInputChange(inputRef.current, (+value - 1).toString());
    }
  };

  // Must be updated for actual React version
  // https://stackoverflow.com/questions/39065010/why-react-event-handler-is-not-called-on-dispatchevent
  const triggerInputChange = (node: HTMLInputElement, inputValue: string) => {
    const descriptor = Object.getOwnPropertyDescriptor(node, "value");

    node.value = `${inputValue}#`;

    if (descriptor && descriptor.configurable) {
      //@ts-ignore
      delete node.value;
    }
    node.value = inputValue;

    const e = document.createEvent("HTMLEvents");
    e.initEvent("change", true, false);
    node.dispatchEvent(e);

    if (descriptor) {
      Object.defineProperty(node, "value", descriptor);
    }
  };

  return (
    <WithLabel labelText={label}>
      <div className={styles.wrapper}>
        <input
          ref={inputRef}
          type="number"
          onChange={onChange}
          placeholder={label}
          value={value}
          name="name"
          min="0"
          max="100"
          readOnly={readOnly}
          required
        />
        <div className={styles.btns}>
          <button
            onClick={plusBtnHandler}
            className={styles.btn + " " + styles.btnPlus}
          >
            +
          </button>
          <button
            onClick={minusBtnHandler}
            className={styles.btn + " " + styles.btnMinus}
          >
            -
          </button>
        </div>
      </div>
    </WithLabel>
  );
};

export default NumberInput;
