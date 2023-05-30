import React from "react";
import { Button } from "./components/atoms/Button";
import { CloneRepositoryForm } from "./components/organisms/CloneRepositoryForm";
import { Modal } from "./components/atoms/Modal";

export const App = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  return (
    <div id="App" className="container p-4">
      <Button onClick={() => setShowModal(true)}>Clone</Button>
      <Modal header="Clone Repository" show={showModal} setShow={setShowModal}>
        <CloneRepositoryForm />
      </Modal>
    </div>
  );
};
