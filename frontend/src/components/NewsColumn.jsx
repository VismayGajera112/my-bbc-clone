import React from 'react'
import { Link } from 'react-router-dom';

const NewsColumn = ({ countrySpecificNews, data }) => {

    return (
        <div>
            {countrySpecificNews ?
                <Link to={'/'}>
                    <div className='hover:opacity-95'>
                        <img src='https://via.placeholder.com/270x180' alt='News Thmbnail' />
                        <h2 className="text-lg ms-2 my-2 font-bold">{data.name}</h2>
                        <p className="text-sm mx-2 mb-2">{data.description}</p>
                    </div>
                </Link>
                :
                <div className='hover:opacity-95'>
                    <Link to={"/"}>
                        <div>
                            <img src={`${data['urlToImage']}`} alt='News Thumbnail' />
                        </div>
                        <div className='h-44'>
                            <h2 className="text-lg my-2 font-bold">{data.title}</h2>
                            <p className="text-sm">{data.description}</p>
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
}

export default NewsColumn
