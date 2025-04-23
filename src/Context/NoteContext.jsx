import axios from "axios";
import React, { createContext } from "react";

export const noteContext = createContext();
export default function NoteContext({ children }) {
  const userTkn = "3b8ny__" + localStorage.getItem("userToken");
  // Function to addUserNote
  const addNoteFn = async (values) => {
    try {
      const data = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        values,
        {
          headers: { token: userTkn },
        }
      );
      console.log("data from NoteContext-addNote", data);
      return data;
    } catch (error) {
      console.log("error from NoteContext-addNote", error);
      throw error;
    }
  };

  // Function to get user notes
  const getUserNotesFn = async () => {
    try {
      const data = await axios.get(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        {
          headers: { token: userTkn },
        }
      );
      console.log("data from NoteContext-getNotes", data);
      return data;
    } catch (error) {
      console.log("error from NoteContext-getNotes", error);
      throw error;
    }
  };
  

  // Funcrion to delete user note 
  const deleteNoteFn = async (noteId)=>{
    try {
      const data = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        {
          headers: { token: userTkn },
        }
      );
      console.log("data from NoteContext-deleteNote", data);
      return data;
    } catch (error) {
      console.log("error from NoteContext-deleteNote", error);
      throw error;
    }
  }

  // Funcrion to update user note 
  const updateNoteFn = async (noteId , values)=>{
    try {
      const data = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, values ,
        {
          headers: { token: userTkn },
        }
      );
      console.log("data from NoteContext-updateNote", data);
      return data;
    } catch (error) {
      console.log("error from NoteContext-updateNote", error);
      throw error;
    }
  }


  return (
    <>
      <noteContext.Provider
        value={{
          addNoteFn,
          getUserNotesFn,
          deleteNoteFn,
          updateNoteFn
        }}
      >
        {children}
      </noteContext.Provider>
    </>
  );
}
