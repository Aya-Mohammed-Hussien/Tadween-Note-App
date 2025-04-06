import React, { useContext, useEffect, useState }  from "react";
import { BsTrash3 } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { modalContext } from "../../Context/ModalContext";
import Modal from "../../components/Modal/Modal";
import { noteContext } from "../../Context/NoteContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { MagnifyingGlass } from "react-loader-spinner";


export default function Home() {
    const [notes, setNotes] = useState([]);
    const {showModal , setShowModal , editingNote, setEditingNote} = useContext(modalContext);
    const {getUserNotesFn , deleteNoteFn} = useContext(noteContext);
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle editing note 
    const handleEditNote = (note)=>{
      setShowModal(true) ; 
      setEditingNote(note);

    }

    // Function to handle get user notes 
    const getUserNotes = async ()=>{
      setIsLoading(true);
    try {
      const {data} = await getUserNotesFn();
      console.log("homeNotes",data)
      setNotes(data.notes);
      setIsLoading(false);
    } catch (error) {
      console.log('error' , error);
      setIsLoading(false);
      throw error;
    }
  }
  // Function to handle delete user note 
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
  },[])
  

  return <>
  <Helmet>
    <title>Home</title>
  </Helmet>
   <section className='p-10'>
        <h1 className='text-3xl pt-2 font-bold mb-10 text-gray-900 dark:text-gray-100 font-DynaPuff'>Notes</h1>
        {isLoading ? <>
        <div className="h-[460px] flex justify-center items-center">
        <MagnifyingGlass
          visible={true}
          height="150"
          width="150"
          ariaLabel="magnifying-glass-loading"
          wrapperClass="magnifying-glass-wrapper"
          glassColor="white"
          color="#1f2937"
           />
        </div>
        </> : 
        notes.length === 0 ? 
        <div className="w-fit mx-auto flex justify-center items-center flex-col text-gray-900 dark:text-white text-3xl font-semibold text-center bg-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg border border-gray-300 py-5 px-6 mt-10">
         <span>No notes yet! </span>
         <span>Start writing and make this space yours.</span>
        </div>
        : 
        <>
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
        </> }
       
      </section >
    {showModal && <Modal editingNote={editingNote} getUserNotes={getUserNotes}/>}
  </>;
}
