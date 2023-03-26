import React, { useState } from "react";
import "./Modal.css";
import AddSubject from "../../AddSubject/AddSubject";

export default function Modal(props:any) {

  const toggleModal = () => {
    props.setIsModalOpen(!props.isModalOpen);
  };

  if(props.isModalOpen) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
        <>
      {/* <button onClick={toggleModal} className="btn-modal">
        Add Subject
      </button> */}
      {props.isModalOpen && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            {props.children}
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
          </>
  );
}
