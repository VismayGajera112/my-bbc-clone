import axios from 'axios';

const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(error);
            }
        );
    });
};

const getLocation = async () => {
    try {
        const GEOCODE_API_KEY = "8c003753a2944dcbb5dab8c7774395f1"
        const { latitude, longitude } = await getUserLocation();
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GEOCODE_API_KEY}`
        );
        return response.data.results[0].components;
    } catch (error) {
        console.log(error);
    }
};

export default getLocation;
export { getUserLocation }