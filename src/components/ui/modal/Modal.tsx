import * as React from "react";
import styles from "./Modal.module.scss";
import { IModalProps } from "./Modal.props";
import CloseIcon from './close2.svg';

export const Modal = ({ children, className, onClose, ...props }: IModalProps): JSX.Element => {
  return (
    <div {...props}>
      <div className={styles.modalOverlay} />
      <div className={styles.modalBoxContainer}>
        <div className={styles.modalBoxControl}>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.modalBoxContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

