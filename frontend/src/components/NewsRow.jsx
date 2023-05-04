import React from 'react'
import NewsColumn from './NewsColumn'
import { Link } from 'react-router-dom';

const NewsRow = ({ rowName, newsdata }) => {

    return (
        <div className='py-2'>
            <Link to={'/news'}>
                <p className='border-s-4 border-red-600 text-2xl my-2 ps-2 font-bold text-gray-700 hover:text-gray-900'>{rowName}</p>
            </Link>
            <div className='grid grid-cols-3 gap-2 h-3/6 mx-2 my-2'>
                <div className='col-span-1 row-span-1 h-100'>
                    <NewsColumn countrySpecificNews={false} data={newsdata[5]} />
                </div>
                <div className='col-span-1 row-span-1'>
                    <NewsColumn countrySpecificNews={false} data={newsdata[6]} />
                </div>
                <div className='col-span-1 row-span-1'>
                    <NewsColumn countrySpecificNews={false} data={newsdata[7]} />
                </div>
            </div>
        </div>
    )
}

export default NewsRow
