import React, { useState, useContext } from 'react'
import { Navigate, Link } from 'react-router-dom'
import NewsListItem from './NewsListItem';
import { Context } from '..';
import { FaArrowLeft } from 'react-icons/fa';

const News = () => {

    const { isAuthenticated, dailyArticle } = useContext(Context)
    const [selectedNews, setSelectedNews] = useState(null);

    const handleNewsClick = (id) => {
        const newsItem = dailyArticle['articles'][id];
        setSelectedNews(newsItem);
    };

    if (!isAuthenticated) return <Navigate to={"/login"} />

    return (
        <div className='pt-16 mx-12'>
            <div className={selectedNews ? "hidden" : ""}>
                {
                    dailyArticle['articles'].slice(0, 20).map((newsItem, index) => (

                        newsItem.urlToImage !== null ?
                            (
                                <Link onClick={() => handleNewsClick(index)} >
                                    <NewsListItem key={index} newsItem={newsItem} />
                                </Link>
                            ) :
                            (
                                <div key={index} style={{ zIndex: -1000 }}></div>
                            )
                    ))
                }
            </div>
            {selectedNews && (
                <div className="news-details-container">
                    <button onClick={() => setSelectedNews(null)} className='flex my-2 items-center justify-evenly gap-3 border rounded-lg p-3 bg-lime-500'> <FaArrowLeft /> Go Back</button>
                    <h2 className='font-bold text-2xl'>{selectedNews.title}</h2>
                    <h2 className='font-semibold'>Author : {selectedNews.author}</h2>
                    <h2 className='font-semibold'>Published : {selectedNews.publishedAt}</h2>
                    <img className='w-full h-2/3' src={selectedNews.urlToImage} alt={selectedNews.title} />
                    <p>{selectedNews.content}</p>
                </div>
            )}
        </div>
    )
}

export default News
