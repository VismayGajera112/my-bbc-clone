import Cookies from 'js-cookie';

const getCookie = (value) => {
    return Cookies.get(value)
}

export default getCookie