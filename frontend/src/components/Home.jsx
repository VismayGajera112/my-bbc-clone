import React, { useState, useEffect, useContext } from 'react'
import NewsBanner from './NewsBanner';
import NewsRow from './NewsRow';
import CountryNews from './CountryNews';
import { Navigate } from 'react-router-dom'
import { getNewsData, getCountryNews, getArticles } from '../utils/GetNewsData';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { Context } from '..';

const Home = () => {

    const { isAuthenticated, loading, setLoading, topHeadlines, setTopHeadlines, countryNews,
        setCountryNews,
        dailyArticle,
        setDailyArticle } = useContext(Context)

    const payload = jwt_decode(Cookies.get('authToken'))

    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-UK', options);

    const getData = async () => {
        const result = await getNewsData();
        const newsCountry = await getCountryNews();
        const articles = await getArticles()
        setTopHeadlines(result)
        setCountryNews(newsCountry)
        setDailyArticle(articles)
        setLoading(true)
    }

    useEffect(() => {
        if (Object.keys(topHeadlines).length === 0 && Object.keys(countryNews).length === 0 && Object.keys(dailyArticle).length === 0) {
            getData().then(() => console.log("Data fetched"))
        } else {
            console.log("Data is already present")
            console.log("Top: ", topHeadlines)
            console.log("Country: ", countryNews)
            console.log("daily: ", dailyArticle)
        }
    }, [topHeadlines]);

    if (!isAuthenticated) return <Navigate to={"/login"} />

    return (
        <div className='mx-4'>
            {
                loading ?
                    <>
                        {/* main Banner */}
                        <div className='flex justify-between text-xl font-bold p-2 my-2'>
                            <p className='text-gray-800'>Welcome to BBC.com</p>
                            <p className='text-gray-500'>{formattedDate}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-4">
                            {/* <!-- First column with big image --> */}
                            <NewsBanner mainBanner={true} data={topHeadlines['articles'][0]} />

                            {/* <!-- Second column with 2x2 layout --> */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-2">
                                {/* <!-- Row 1, Column 1 --> */}
                                <div className="col-span-1 row-span-1">
                                    <NewsBanner mainBanner={false} data={topHeadlines['articles'][1]} />
                                </div>

                                {/* <!-- Row 1, Column 2 --> */}
                                <div className="col-span-1 row-span-1">
                                    <NewsBanner mainBanner={false} data={topHeadlines['articles'][2]} />
                                </div>

                                {/* <!-- Row 2, Column 1 --> */}
                                <div className="col-span-1 row-span-1">
                                    <NewsBanner mainBanner={false} data={topHeadlines['articles'][3]} />
                                </div>

                                {/* <!-- Row 2, Column 2 --> */}
                                <div className="col-span-1 row-span-1">
                                    <NewsBanner mainBanner={false} data={topHeadlines['articles'][4]} />
                                </div>
                            </div>
                        </div>
                        {/* News and Sports */}

                        <div className='flex'>
                            {/* Left Section */}
                            <aside className="w-full float-left">

                                {/* News */}
                                <NewsRow rowName={"News"} newsdata={topHeadlines['articles']} />

                                {/* User Country Specific news */}
                                <div className='my-4'>
                                    <CountryNews userCountry={payload['country']} countrynewsdata={countryNews['sources']} />
                                </div>

                            </aside>

                            {/* Right section */}
                            <aside className="w-3/6 bg-gray-200 float-right">
                                {
                                    dailyArticle.articles.length >= 2 ?
                                        (
                                            dailyArticle.articles.slice(0, 2).map((article, index) => (
                                                <div key={index} className="p-4">
                                                    <img src={article.urlToImage} alt="News Thumbnail" className='w-full h-48 bg-cover hover:opacity-95' />
                                                    <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                                                    <p className="text-sm">{article.description}</p>
                                                </div>
                                            ))
                                        )
                                        : <p className='font-bold text-lg'>No articles to display</p>
                                }

                            </aside>
                        </div>

                    </> :
                    <>
                        <div className="flex items-center justify-center h-screen">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    </>
            }
        </div>

    )
}

export default Home
