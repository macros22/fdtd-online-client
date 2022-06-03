import * as React from "react";
import styles from "./Modal.module.scss";
import { ModalProps } from "./Modal.props";


const Modal: React.FC<ModalProps> = ({ children, className, ...props }) => {
  return (
    <div>
      <div className={styles.modalOverlay} />

      <div className={styles.modalBoxContainer}>
        <div className={styles.modalBoxControl}>
          <button>sd</button>
        </div>

        <div className={styles.modalBoxContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
