import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiNotebook } from 'react-icons/gi'
import { HiOutlineCalendar, HiOutlineMail, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi'
import { MdLockPerson } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { isValid, z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { authContext } from '../../Context/AuthContext'
import Swal from 'sweetalert2'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Register() {
const [errorApi , setErrorApi] = useState(null);
 const {registerUserFn} = useContext(authContext);
 const myNavigation = useNavigate();

 const schema = z.object({
  name:z.string().min(3 , "Name must be at least 3 characters").max(12 ,"Name must be at most 12 characters"),
  email:z.string().email("Please enter a valid email address (e.g., name@example.com)."),
  password:z.string().regex(/^[a-zA-Z0-9]{6,10}$/ , "Password must be 6-10 characters long and include only letters and numbers."),
  age:z.coerce.number().min(18 , "Age must be at least 18").max(80,"Age must be at most 80"),
  phone:z.string().regex(/^01[0125][0-9]{8}$/ , "Phone Number must be an egyption number")
 })

 const {register , handleSubmit , formState:{errors , isSubmitting , isValid}} = useForm({mode:"all" , resolver: zodResolver(schema)});

 //  function to handle register user 
 const registerUser =async (values)=>{
  try {
    const {data}= await registerUserFn(values);
    setErrorApi(null);
    console.log(data) ;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You’ve successfully created your account!",
      showConfirmButton: false,
      timer: 1000
    });
    setTimeout(() => {
      myNavigation('/login')
    }, 1000);
  } catch (error) {
    setErrorApi(error.response.data.msg);
    console.log('error' , error.response.data.msg)
  }
 }

  return (
    <>
    <Helmet>
        <title>Register</title>
    </Helmet>
      <section className="flex items-center justify-center min-h-screen p-5 md:p-0">
        <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center dark:bg-gray-700">
              <span className="text-white text-3xl font-bold dark:text-gray-200">
                <GiNotebook />
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center dark:text-white mb-5">Create an account</h2>
          { errorApi ? 
       <div className="p-2 mb-2 mt-1 text-sm font-medium text-red-800 rounded-lg bg-red-300 " role="alert">
       {errorApi} </div> : ""}
          <form onSubmit={handleSubmit(registerUser)} >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <span className="mr-2 text-gray-500 dark:text-gray-400">
                  <HiOutlineUser />
                </span>
                <input type="text" {...register('name')} className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                  placeholder="John Doe" />
              </div>
              {errors.name && <div className='text-red-500 m-2 text-sm'>{errors.name.message}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <span className="mr-2 text-gray-500 dark:text-gray-400">
                  <HiOutlineMail />
                </span>
                <input type="email" {...register('email')} className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                  placeholder="info@pixsellz.io" />
              </div>
              {errors.email && <div className='text-red-500 m-2 text-sm'>{errors.email.message}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <span className="mr-2 text-gray-500 dark:text-gray-400">
                  <MdLockPerson />
                </span>
                <input type="password" {...register('password')} className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                  placeholder="Enter your password" />
              </div>
              {errors.password && <div className='text-red-500 m-2 text-sm'>{errors.password.message}</div>}
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Age</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                  <span className="mr-2 text-gray-500 dark:text-gray-400">
                    <HiOutlineCalendar />
                  </span>
                  <input type="number" {...register('age')} className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                    placeholder="42" />
                </div>
                {errors.age && <div className='text-red-500 m-2 text-sm'>{errors.age.message}</div>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Phone Number</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                  <span className="mr-2 text-gray-500 dark:text-gray-400">
                    <HiOutlinePhone />
                  </span>
                  <input type="tel" {...register('phone')} className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                    placeholder="01112222333" />
                </div>
                {errors.phone && <div className='text-red-500 m-2 text-sm'>{errors.phone.message}</div>}
              </div>
            </div>
            <button type="submit" disabled={!isValid}
              className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 
                            dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors disabled:cursor-not-allowed 
                            disabled:bg-gray-400 dark:disabled:bg-gray-500">
             {isSubmitting?<div className='mx-auto animate-spin rounded-full border-b-2 h-5 w-5'></div>:"Create an account → "}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4 dark:text-gray-400">
            Already have an account? <Link to={"/login"} className="text-gray-800 font-semibold cursor-pointer dark:text-gray-200 hover:underline">Sign In</Link>
          </p>
        </div>
      </section>
    </>
  )
}
