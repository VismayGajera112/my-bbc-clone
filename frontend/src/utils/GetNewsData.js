import axios from 'axios'


const getNewsData = async () => {
    const response = await axios.get('/news/top-headlines')
    return response.data
}

const getCountryNews = async () => {
    const response = await axios.get('/news/getSpecificCountryNews')
    return response.data
}

const getArticles = async () => {
    const response = await axios.get('/news/getArticles')
    return response.data
}

export { getNewsData, getCountryNews, getArticles }