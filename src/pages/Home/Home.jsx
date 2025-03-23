import React, { useContext, useEffect, useState }  from "react";
import { BsTrash3 } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { modalContext } from "../../Context/ModalContext";
import Modal from "../../components/Modal/Modal";
import { noteContext } from "../../Context/NoteContext";
import Swal from "sweetalert2";


export default function Home() {
    const [notes, setNotes] = useState([]);
    const {showModal , setShowModal , editingNote, setEditingNote} = useContext(modalContext);
    const {getUserNotesFn , deleteNoteFn} = useContext(noteContext);

    // Function to handle editing note 
    const handleEditNote = (note)=>{
      setShowModal(true) ; 
      setEditingNote(note);

    }

    // Function to handle get user notes 
    const getUserNotes = async ()=>{
    try {
      const {data} = await getUserNotesFn();
      console.log("homeNotes",data)
      setNotes(data.notes);
    } catch (error) {
      console.log('error' , error);
      throw error;
    }
  }
  // Function to handle delet user note 
  const deleteNote = async (noteId)=>{
    try {
     const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
        if (result.isConfirmed) {
          const {data} = await deleteNoteFn(noteId);
          console.log(data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your note has been deleted.",
            showConfirmButton: false,
            timer: 1000
          });
          setTimeout(() => {
            getUserNotes();
          }, 900);
        }
    } catch (error) {
      console.log('error' , error);
      throw error;
    }
  }
  
  useEffect(() => {
    getUserNotes()
  }, [])
  


  return <>
   <section className='p-10'>
        <h1 className='text-3xl pt-2 font-bold mb-10 text-gray-900 dark:text-gray-100 font-DynaPuff'>Notes</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes?.map((note)=>
           <div key={note._id} className="w-full h-64 flex flex-col justify-between bg-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg border border-gray-300 mb-6 py-5 px-4">
           <div key={note._id}>
           <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{note.title}</h4>
           <p className="text-gray-800 dark:text-gray-100 text-sm">{note.content}</p>
         </div>
         <div>
           <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
             <button onClick={()=>deleteNote(note._id)}  className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300 focus:ring-black" >
               <BsTrash3 />
             </button>
             <button  onClick={()=>{handleEditNote(note)}} className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300 focus:ring-black" >
               <GrEdit />
             </button>
           </div>
         </div>
       </div>
          )}
        </div>
      </section >
    {showModal && <Modal editingNote={editingNote} getUserNotes={getUserNotes}/>}
  </>;
}
