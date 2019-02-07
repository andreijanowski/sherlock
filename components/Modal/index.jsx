import ReactResponsiveModal from "react-responsive-modal";
import { ModalStyles } from "./styled";

const Modal = p => (
  <>
    <ModalStyles />
    <ReactResponsiveModal
      {...{
        ...p,
        classNames: {
          overlay: "modal-overlay",
          modal: "modal-modal",
          closeButton: "modal-closeButton",
          closeIcon: "modal-closeIcon",
          transitionEnter: "modal-transitionEnter",
          transitionEnterActive: "modal-transitionEnterActive",
          transitionExit: "modal-transitionExit",
          transitionExitActive: "modal-transitionExitActive"
        }
      }}
    />
  </>
);

export default Modal;
