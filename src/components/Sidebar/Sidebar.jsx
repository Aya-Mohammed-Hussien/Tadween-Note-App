import { FaCirclePlus } from "react-icons/fa6";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import { modalContext } from "../../Context/ModalContext";
import { FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Sidebar() {
  const {token , setToken} = useContext(authContext);
  const {setShowModal , setEditingNote} = useContext(modalContext);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode'));
  const myNavigation = useNavigate();
 

// Function to handle logout 
const logoutFn = ()=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out!",
  }).then((result) => {
    if (result.isConfirmed) {
      setTimeout(() => {
        setToken("");
        localStorage.removeItem('userToken');
        myNavigation('/login')
      }, 700);
    }
  });
}

// Handle darkMode 
useEffect(() => {
  if(darkMode){
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode' , darkMode);
  }else{
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('darkMode');
  }
}, [darkMode])



  return (
    <>
      <div className="bg-white w-24 dark:bg-gray-800 text-gray-900 dark:text-white h-screen fixed transition-all duration-300 border-r border-gray-300 dark:border-gray-700 bg-transparent ease-in-out flex flex-col justify-between">
        <div className="top-bar">
          <div className="border-b border-gray-300 dark:border-gray-700">
            <div className="text-center text-base font-semibold font-DynaPuff py-4 flex justify-center items-center gap-1">
              <span>Tadween</span>
            <FaPencilAlt className="text-sm" />
            </div>
          </div>
          <nav className="mt-4 space-y-4 flex flex-col justify-around">
            { token ? <>
             {/* AddNote Icon */}
             <div className="relative">
              <button 
                onClick={()=>{setShowAddOptions(!showAddOptions)}}
                className="rounded-xl mx-auto block mt-4 mb-2 text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                <FaCirclePlus className={`text-2xl transition-transform duration-300 ${showAddOptions ? "rotate-45" : ""}`}
                />
              </button>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAddOptions ? "max-h-40 scale-95 opacity-100" : "max-h-0 scale-95 opacity-0"} `}>
              <button onClick={()=>{
                setShowAddOptions(false);
                setShowModal(true) ;
                setEditingNote(null);
              }}
                className="mt-2 text-xs font-light font-sans block px-1.5 mx-auto text-center bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 transition-all" >
               New Note
              </button>
            </div>
            </> : <>
               {/* Register button */}
            <div className="relative group">
               <Link to={"/register"} className="block py-3 px-4 w-full hover:bg-gray-300 dark:hover:bg-gray-700 text-center">
               <BsPersonFillAdd className='text-2xl mx-auto' />
               <span className="absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                 Register
               </span>
               </Link>
            </div>
            {/* Login button */}
            <div className="relative group">
               <Link to={"/login"} className="block py-3 px-4 w-full hover:bg-gray-300 dark:hover:bg-gray-700 text-center">
               <RiLoginCircleLine className='text-2xl mx-auto' />
               <span className="absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                 Login
               </span>
               </Link>
            </div>
            </>}
          </nav>
        </div>
        <div className="bottom-bar">
          {token && <>
           {/* Logout button */}
          <div className="group relative">
            <button onClick={()=>{logoutFn()}} className="block py-3 px-4 w-full mx-auto hover:bg-gray-300 dark:hover:bg-gray-700">
              <RiLogoutCircleLine className='text-2xl mx-auto' />
                <span className="absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Logout
                </span>
            </button>
          </div>
          </>}
          {/* Handle Dark&Light mode  */}
          <div className="relative w-full border-t border-gray-300 dark:border-gray-700 space-y-4">
                      <button  onClick={()=>{setDarkMode(!darkMode)}}
                        className="block mx-auto my-4 p-2 bg-gray-300 dark:bg-gray-700 rounded-full">
                        {darkMode ?  <FaSun className="text-md" />  : <FaMoon  className="text-md" />}
                      </button>
          </div>
        </div>
      </div>
   
    </>
  );
}
