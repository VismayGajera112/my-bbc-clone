import React from 'react'

const NewsListItem = ({ newsItem }) => {
    return (
        <div className="grid grid-col-2 my-5 justify-start h-40 shadow-md rounded-xl" style={{ zIndex: 1000 }}>
            <div className='p-2 w-80 col-start-1 col-end-1 col-span-1'>
                <img src={newsItem.urlToImage} alt={newsItem.title} className='w-72 h-36 object-cover rounded-xl' />
            </div>
            <div className="p-2 col-start-2 col-span-1" style={{ overflowWrap: "break-word" }}>
                <h3 className='font-bold'>{newsItem.title}</h3>
                <p className='line-clamp-2'>{newsItem.description}</p>
                <p className='font-semibold'> Source : {newsItem.source.name}</p>
                <p className='font-semibold'>Published : {newsItem.publishedAt}</p>
            </div>
        </div>
    );
};


export default NewsListItem
