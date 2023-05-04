import React, { useState } from 'react'
import { SiBbc } from 'react-icons/si'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { MdEmail, MdPassword } from "react-icons/md";

const Register = () => {
    const options = ["India", "China", "Russia", "UK", "USA"]

    const navigate = useNavigate()

    const [country, setCountry] = useState('UK');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/users', {
            email,
            password,
            country
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 5000,
            onUploadProgress: function (progressEvent) {
                console.log("Upload progress: " + Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%")
                setEmail("")
                setPassword("")
                setCountry("UK")
            }
        })
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    toast.success(response.data.message)
                    navigate("/login")
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    function handleOptionChange(event) {
        setCountry(event.target.value);
    }

    return (
        <div className='px-2 bg-black text-white h-screen pt-12'>
            <div className='flex flex-col items-center'>
                <span><SiBbc className="text-9xl" /></span>
                <p className='text-3xl font-bold text-center'>Register with the BBC</p>
            </div>
            <form className='flex flex-col items-center my-5 gap-7 py-5' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex gap-2 items-center'>
                    <MdEmail className='text-2xl' />
                    <input type='email' name='email' style={{ border: 'none' }} placeholder='Email' className='p-2 text-xl bg-black text-white focus:outline-none focus:ring focus:border-blue-500 rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='flex gap-2 items-center'>
                    <MdPassword className='text-2xl' />
                    <input type='password' name='password' style={{ border: 'none' }} placeholder='Password' className='p-2 text-xl bg-black text-white focus:outline-none focus:ring focus:border-blue-500 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='text-xl focus:outline-none '>
                    <label htmlFor="dropdown-input">Country:</label>
                    <select id="dropdown-input" className='bg-black text-white p-1.5' value={country} onChange={handleOptionChange}>
                        {
                            options.map((option, index) => (
                                <option key={index} value={option} className='p-2 m-2'>{option}</option>
                            ))
                        }
                    </select>
                </div>
                <button type='submit' className='rounded-md bg-blue-600  w-60 p-3 text-xl hover:opacity-95'>Register</button>
            </form>
        </div>
    )
}

export default Register
