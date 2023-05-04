import React from 'react'
import NewsColumn from './NewsColumn'
import { Link } from 'react-router-dom';


const CountryNews = ({ userCountry, countrynewsdata }) => {

    return (
        <div className=''>
            <Link to={`${userCountry}News`}>
                <p className='border-s-4 border-red-600 text-2xl ps-2 font-bold text-gray-700 hover:text-gray-900'>{userCountry} News</p>
            </Link>
            <div className='grid grid-cols-3 gap-2 h-3/6 my-2 mx-2'>

                {
                    countrynewsdata.map((value, index) => (
                        <div key={index} className='col-span-1 row-span-1'>
                            <NewsColumn countrySpecificNews={true} data={value} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CountryNews
