import React, { createContext, useState } from "react";

export const modalContext = createContext();

export default function ModalContext({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  return (
    <>
      <modalContext.Provider
        value={{
          showModal,
          setShowModal,
          editingNote,
          setEditingNote,
        }}
      >
        {children}
      </modalContext.Provider>
    </>
  );
}
