import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '..';

const News = () => {

    const { isAuthenticated } = useContext(Context)

    if (!isAuthenticated) return <Navigate to={"/login"} />

    return (
        <div className='pt-16 mx-12 bg-red-200'>
            News
        </div>
    )
}

export default News
