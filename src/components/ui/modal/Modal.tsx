import * as React from "react";
import styles from "./Modal.module.scss";
import { ModalProps } from "./Modal.props";
import CloseIcon from './close2.svg';

const Modal: React.FC<ModalProps> = ({ children, className, onClose, ...props }) => {
  return (
    <div {...props}>
      <div className={styles.modalOverlay} />

      <div className={styles.modalBoxContainer}>
        <div className={styles.modalBoxControl}>
          <button onClick={onClose}><CloseIcon/></button>
        </div>

        <div className={styles.modalBoxContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
