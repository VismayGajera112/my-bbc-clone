import React, { useState, useEffect, useContext } from "react";
import { WiThunderstorm } from "react-icons/wi";
import { FaCloudRain, FaSnowflake, FaSun, FaCloud } from "react-icons/fa";
import axios from "axios";
import { getUserLocation } from "../utils/GetLocation";
import getLocation from '../utils/GetLocation';
import { Navigate } from 'react-router-dom'
import { Context } from '..';
import Clock from "./Clock";

const Weather = () => {

    const [index, setIndex] = useState(0)
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("")

    const { isAuthenticated } = useContext(Context)

    const date = new Date();
    const formattedDate = date.toISOString().substring(0, 10);
    const hours = date.getHours();

    const getCurrentLocation = async () => {
        const { latitude, longitude } = await getUserLocation();
        const currentCity = await getLocation()
        setCity(currentCity.city)
        return { latitude, longitude }
    }

    useEffect(() => {

        const location = getCurrentLocation();

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${(await location).latitude}&longitude=${(await location).longitude}&hourly=temperature_2m,,precipitation_probability,weathercode&daily=weathercode&current_weather=true&timezone=auto`
                );
                setWeather(response.data);
                setIndex(response.data.hourly.time.indexOf(`${formattedDate}T${hours}:00`))
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [formattedDate, hours]);

    const getIcon = (code) => {
        switch (code) {
            case 0:
            case "clearsky_night":
                return <FaSun color="#FDB813" />;
            case 1:
            case 2:
            case 3:
            case 45:
            case 48:
                return <FaCloud color="#AEB8C2" />;
            case 51:
            case 53:
            case 55:
            case 61:
            case 63:
            case 65:
                return <FaCloudRain color="#6B798C" />;
            case 95:
            case 96:
            case 99:
                return <WiThunderstorm color="#0F1C2E" />;
            case 71:
            case 73:
            case 74:
                return <FaSnowflake color="#6B798C" />;
            default:
                return null;
        }
    };

    if (!isAuthenticated) return <Navigate to={"/login"} />

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto p-8">
                {weather ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8">{city} Weather</h1>
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <div className="flex items-center mb-4">
                                <div className="text-5xl">{getIcon(weather.current_weather.weathercode)}</div>
                                <div className="ml-4">
                                    <div className="text-2xl font-bold">
                                        {weather.current_weather.temperature}°C
                                    </div>
                                </div>
                            </div>
                            <div className="float-right">
                                <Clock />
                            </div>
                            <div className="flex justify-between text-sm">
                                <div>
                                    <div className="text-gray-500">Wind Speed</div>
                                    <div className="font-semibold">{weather.current_weather.windspeed} km/h</div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {weather.hourly.time.slice(index, index + 8).map((hour, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-lg p-3 text-center flex flex-col justify-center items-center"
                                >
                                    <div className="text-4xl pb-1">{getIcon(weather.hourly.weathercode[index])}</div>
                                    <div className="text-gray-500">{hour.replace('T', " | ")}</div>
                                    <div className="text-lg font-bold">{weather.hourly.temperature_2m[index]}°C</div>
                                </div>

                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Weather
