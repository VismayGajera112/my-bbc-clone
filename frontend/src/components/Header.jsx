import React, { useContext } from 'react'
import { SiBbc } from 'react-icons/si'
import { FaHome, FaNewspaper, FaUser } from 'react-icons/fa'
import { MdLogout } from "react-icons/md";
import { TiWeatherCloudy } from "react-icons/ti";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Context } from '../index';


const Header = () => {

    const { setIsAuthenticated, setTopHeadlines, setCountryNews, setDailyArticle } = useContext(Context)

    const handleLogout = async () => {
        await axios.get('/users/logout', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
            .then((response) => {
                if (response.data.status === 200) {
                    Cookies.remove('authToken')
                    setTopHeadlines({})
                    setCountryNews({})
                    setDailyArticle({})
                    setIsAuthenticated(false)
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className="w-full max-h-16 bg-black text-white py-2 px-8  flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/">
                    <span className="text-6xl"><SiBbc /></span>
                </Link>
                <Link to="/login" className="ml-5 flex gap-2 hover:border-b-2 border-blue-500">
                    <FaUser className="mt-3" />
                    <span className='p-2'>Sign In</span>
                </Link>
            </div>
            <div className='flex'>
                <Link to="/" className="p-2 hover:border-b-2 border-green-500">
                    <div className='flex gap-2'>
                        <FaHome className='text-2xl' />
                        <span>Home</span>
                    </div>
                </Link>
                <Link to="/news" className="ml-4 p-2 hover:border-b-2 border-yellow-500">
                    <div className='flex gap-2'>
                        <FaNewspaper className='text-2xl' />
                        <span>News</span>
                    </div>
                </Link>
                <Link to="/weather" className="ml-4 p-2 hover:border-b-2 border-red-500">
                    <div className='flex gap-2'>
                        <TiWeatherCloudy className='text-2xl' />
                        <span>Weather</span>
                    </div>
                </Link>
                <Link to="/login" onClick={() => handleLogout()} className="ml-4 p-2 hover:border-b-2 border-fuchsia-700">
                    <div className='flex gap-2'>
                        <MdLogout className='text-2xl' />
                        <span>Logout</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
