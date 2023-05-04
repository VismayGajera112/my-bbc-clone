import React, { useState } from 'react'
import { SiBbc } from 'react-icons/si'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { MdEmail, MdPassword } from "react-icons/md";
import Cookies from 'js-cookie';
import { Context } from '../index';
import { useContext } from 'react';

const Login = () => {

    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(Context)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        if (email !== "" && password !== "") {
            axios.post('/users/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                timeout: 5000,
                onUploadProgress: function (progressEvent) {
                    console.log("Upload progress: " + Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%")
                    setEmail("")
                    setPassword("")
                }
            })
                .then((response) => {
                    // console.log(response)
                    if (response.data.status === 200) {
                        Cookies.set('authToken', response.data.authToken)
                        setIsAuthenticated(true)
                        toast.success(response.data.message)
                        navigate("/")
                    } else {
                        toast.error(response.data.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <div className='px-2 bg-black text-white h-screen pt-12'>
            <div className='flex flex-col items-center'>
                <span><SiBbc className="text-9xl" /></span>
                <p className='text-3xl font-bold text-center'>Sign in</p>
            </div>
            <form className='flex flex-col items-center my-2 gap-5 py-5' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex gap-2 items-center'>
                    <MdEmail className='text-2xl' />
                    <input type='email' name='email' style={{ border: 'none' }} placeholder='Email' className='p-2 text-xl bg-black text-white focus:outline-none focus:ring focus:border-blue-500 rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='flex gap-2 items-center'>
                    <MdPassword className='text-2xl' />
                    <input type='password' name='password' style={{ border: 'none' }} placeholder='Password' className='p-2 text-xl bg-black text-white focus:outline-none focus:ring focus:border-blue-500 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className='rounded-md bg-blue-600  w-60 p-3 text-xl hover:opacity-95 '>Sign in</button>
                <hr className='w-80' />
            </form>
            <div className='text-center'>
                <p className='text-2xl'>Don’t have a BBC account?</p>
                <Link to="/register" className='font-bold text-lg text-blue-500 underline underline-offset-4' >Register now</Link>
            </div>
        </div>
    )

}

export default Login
