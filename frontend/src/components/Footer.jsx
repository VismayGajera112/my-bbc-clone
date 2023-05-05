import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {

    const currentLink = useLocation().pathname;

    return (
        <div className={
            currentLink === "/login" || currentLink === "/register" ? "hidden bottom-0"
                :
                "bg-[#4C4C4C] px-8 py-2 text-white"
        }>
            <div className='mx-8 p-2'>
                <p className='text-2xl font-bold p-2'>Explore the BBC</p>
                <div className='flex justify-between p-2 text-lg font-semibold'>
                    <Link to={'/'}>Home</Link>
                    <span>|</span>
                    <Link to={'/news'}>News</Link>
                    <span>|</span>
                    <Link to={'/weather'}>Weather</Link>
                    <span>|</span>
                    <Link to={'/IndiaNews'}>India News</Link>
                </div>
                <hr className='my-2' />
            </div>
            <div className='flex justify-between p-2 mx-10'>
                <Link className='hover:underline'>Terms of Use</Link>
                <Link className='hover:underline'>About the BBC</Link>
                <Link className='hover:underline'>Cookies</Link>
                <Link className='hover:underline'>Contact the BBC</Link>
                <Link className='hover:underline'>Advertise with us</Link>
            </div>
            <div className='p-2 mx-10'>
                <p><strong>Copyright © 2023 BBC. </strong> The BBC is not responsible for the content of external sites.</p>
            </div>
        </div >
    )
}

export default Footer
