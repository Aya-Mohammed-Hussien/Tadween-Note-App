import React, { useContext, useEffect }  from 'react';
import { IoIosClose } from "react-icons/io";
import { modalContext } from '../../Context/ModalContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteContext } from '../../Context/NoteContext';
import Swal from 'sweetalert2';



export default function Modal({getUserNotes , editingNote}) {
  const {setShowModal} = useContext(modalContext);
  const {addNoteFn , updateNoteFn} = useContext(noteContext);
 

  const schema = z.object({
    title : z.string().min(1,"Title is Required"),
    content:z.string().min(1,"Content is Required")
  })
  const {register , handleSubmit , formState:{isSubmitting , errors} , setValue } = useForm({mode:"all" , resolver:zodResolver(schema)})

  //  Function to handle addNote & updateNote
const handleNote = async (values)=>{
    try {
        if(editingNote){
            const {data} = await updateNoteFn(editingNote._id , values);
            console.log(data)
        } else{
            const {data} = await addNoteFn(values);
            console.log(data);
        }
        Swal.fire({
            position: "center",
            icon: "success",
            title: `${editingNote ? "Note updated successfully!" : "Note added successfully!"}`,
            showConfirmButton: false,
            timer: 1000
          });
        setShowModal(false);
        setTimeout(() => {
            getUserNotes();
        }, 900);
       
    } catch (error) {
        console.log('error' , error);
        throw error;
    }
}

useEffect(() => {
 if(editingNote){
    setValue('title' , editingNote.title);
    setValue('content' , editingNote.content)
 }
}, [])


    return (
        <>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="flex fixed z-50 bg-black/50 ml-20 inset-0 items-center justify-center">
                <div className="p-4 w-full max-w-xl max-h-full">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-xl overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-4">
                            <h2 className="text-xl font-semibold text-black dark:text-white">
                              {editingNote ? "Edit Note" : "New Note"}  
                            </h2>
                            <button onClick={()=>{setShowModal(false)}}
                               className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <IoIosClose className='text-3xl' />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(handleNote)} className="bg-gray-50 dark:bg-gray-700 flex flex-col gap-3">
                            <div className='border-y-2 dark:border-gray-600 p-4'>
                                <input type="title" {...register('title')} className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-medium rounded-lg block outline-none w-full p-2.5 placeholder-gray-500 dark:placeholder-gray-400" required placeholder="Note Title" />
                                {errors.title && <div className='text-red-500 m-2 text-sm'>{errors.title.message}</div>}
                                <textarea rows="2" {...register('content')} className="bg-gray-50 dark:bg-gray-700 outline-none resize-none block p-2.5 w-full text-base text-gray-900 dark:text-white rounded-lg placeholder-gray-500 dark:placeholder-gray-400" placeholder="Write your thoughts here..." />
                                {errors.content && <div className='text-red-500 m-2 text-sm'>{errors.content.message}</div>}
                            </div>
                            <div type="submit" className="px-6 py-3 flex justify-end gap-3">
                                <button className="px-4 py-2 text-black dark:text-white rounded-lg border dark:border-gray-600 text-sm font-sans hover:bg-gray-100 dark:hover:bg-gray-600">
                                {isSubmitting?<div className='mx-auto animate-spin rounded-full border-gray-900 border-b-2 h-5 w-5'></div> : editingNote ? "Update Note" : "Add Note"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}