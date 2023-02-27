import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal} >
      <div >{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("overlay-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay >{props.children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Modal;
