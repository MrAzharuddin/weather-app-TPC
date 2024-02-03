"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const convertKelvinToCelsius = (k) => {
  return (k - 273.15).toFixed(0);
};
function Weather() {
  const [weather, setWeather] = useState({
    status: "ok",
    message: "Weather info fetched successfully",
    data: {
      coord: { lon: 42.35, lat: -70.9 },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
      base: "stations",
      main: {
        temp: 258.96,
        feels_like: 251.96,
        temp_min: 258.96,
        temp_max: 258.96,
        pressure: 986,
        humidity: 77,
        sea_level: 986,
        grnd_level: 762,
      },
      visibility: 10000,
      wind: { speed: 4.98, deg: 78, gust: 6 },
      clouds: { all: 49 },
      dt: 1706959295,
      sys: { sunrise: 1706914815, sunset: 1706989701 },
      timezone: 10800,
      id: 0,
      name: "",
      cod: 200,
    },
  });

  const date = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
    useEffect(() => {
      axios
        .post("http://localhost:5000/api/v1/weather/weather-info", {
          lat: -70.9,
          lon: 42.35,
        })
        .then((res) => {
          console.log(res.data);
          setWeather(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  return (
    <>
      <div className="w-[90vw] mx-auto shadow-xl mt-8 border rounded-xl space-y-5">
        <div className="py-4">
          <h1 className="text-center text-4xl font-bold text-black ">
            Klimbb Weather App
          </h1>
          <p className="text-center text-black font-medium">
            Check the weather in your city
          </p>
          <p className="text-center text-black font-medium">{date}</p>
        </div>
        <div className="flex items-center justify-between  space-x-8 py-8 px-12">
          <div className="flex items-center gap-4">
            <div>
              <p className="w-32 h-32 bg-cyan-300/50 rounded-full flex items-center justify-center text-5xl font-black">
                <span>
                  {convertKelvinToCelsius(weather.data.main.temp)} &deg;
                </span>
              </p>
            </div>
            <div className="space-y-2">
              {/* <p className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`}
              alt="icon"
            />
            Feels Like: {convertKelvinToCelsius(weather.data.main.feels_like)}{" "}
            &deg;C
          </p> */}
              <p className="px-4 bg-cyan-300/30 rounded-full py-2 font-semibold">
                H: {convertKelvinToCelsius(weather.data.main.temp_max)} &deg;
              </p>
              <p className="px-4 bg-cyan-300/30 rounded-full py-2 font-semibold">
                L: {convertKelvinToCelsius(weather.data.main.temp_min)} &deg;
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              className="bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <p className="text-center font-extrabold text-5xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                {weather.data.weather[0].description}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-[90vw] mx-auto shadow-xl mt-8 border rounded-xl space-y-5 py-8 px-12">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="border rounded-xl space-y-2 py-4 px-8 shadow-2xl">
              <p className="text-left text-black font-medium">
                Wind Speed: {weather.data.wind.speed} m/s
              </p>
              <p className="text-left text-black font-medium">
                Wind Direction: {weather.data.wind.deg}°
              </p>
            </div>
            <div className="border rounded-xl space-y-2 py-4 px-8 shadow-2xl">
              <p className="text-left text-black font-medium">
                Pressure: {weather.data.main.pressure} hPa
              </p>
              <p className="text-left text-black font-medium">
                Humidity: {weather.data.main.humidity}%
              </p>
            </div>
          </div>
          <div>
            <p className="w-96 font-semibold">
              with real time data and advanced technology, we provide reliable
              forecasts for any location around the world.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;

// {"status":"ok","message":"Weather info fetched successfully","data":{"coord":{"lon":42.35,"lat":-70.9},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":258.96,"feels_like":251.96,"temp_min":258.96,"temp_max":258.96,"pressure":986,"humidity":77,"sea_level":986,"grnd_level":762},"visibility":10000,"wind":{"speed":4.98,"deg":78,"gust":6},"clouds":{"all":49},"dt":1706959295,"sys":{"sunrise":1706914815,"sunset":1706989701},"timezone":10800,"id":0,"name":"","cod":200}}
