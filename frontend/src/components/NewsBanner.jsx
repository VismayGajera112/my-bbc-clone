import React from 'react'
import { Link } from 'react-router-dom';

const NewsBanner = ({ mainBanner, data }) => {

    return (
        <div>
            {
                mainBanner ?
                    <>
                        <Link to={`/news/${data.id}`}>
                            {/* bg-[url('https://via.placeholder.com/600x300') */}
                            {/* style={{ backgroundImage: `url(${data['urlToImage']})` }} */}
                            <div className="relative col-span-1 w-full h-80 bg-cover hover:opacity-95" style={{ backgroundImage: `url(${data['urlToImage']})` }} >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                                {/* <!-- Text overlay --> */}

                                {/* {data.title} */}
                                <h2 className="text-lg ms-2 mb-10 font-bold absolute bottom-0 left-0 text-white">{data.title}</h2>
                                {/* {data.description} */}
                                <p className="text-sm ms-2 absolute bottom-0 left-0 text-white">{data.description}</p>
                            </div>
                        </Link>
                    </> :
                    <>
                        <Link to={'/news'}>
                            {/* bg-[url('https://via.placeholder.com/600x300') */}
                            {/* style={{ backgroundImage: `url(${data['urlToImage']})` }} */}
                            <div className="relative w-full h-36 hover:opacity-95" style={{ backgroundImage: `url(${data['urlToImage']})`, backgroundSize: "cover" }} >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                                {/* <!-- Text overlay --> */}

                                {/* {data.title} */}
                                <h2 className="ms-2 font-bold absolute bottom-0 left-0 text-white">{(data.title)}</h2>
                                {/* {data.description} */}
                                {/* <p className="text-sm ms-2 absolute bottom-0 left-0 text-white">{(data.description).slice(0, 40)}</p> */}
                            </div>
                        </Link>
                    </>
            }
        </div>
    )
}

export default NewsBanner
