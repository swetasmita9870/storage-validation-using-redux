import React from "react";
import { Button, Modal } from "react-bootstrap";
const Modal1 = ({ props, handleDelete, handlermodal, modalOpen }) => {
  const deleteData = () => {
    handleDelete(modalOpen.id);
    handlermodal();
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalOpen.show}
        onHide={handlermodal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are Sure Want To Delete ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="warning" onClick={handlermodal}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteData}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modal1;
