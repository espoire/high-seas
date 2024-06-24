import "./Scene.css";
import Fog from "./Fog.jsx";
import Sea from "./Sea.jsx";
import Sky from "./Sky.jsx";
import Wind from "./Wind.jsx";
import { useEffect, useRef, useState } from "react";
import WeatherState from "./WeatherState.js";

const weather = new WeatherState();

export default function Scene() {
  const [ overcast, setOvercast ] = useState(weather.current.overcast);
  const [ wind, setWind ] = useState(weather.current.wind);

  const interval = useRef(null);
  useEffect(() => {
    weather.update();

    if (interval.current == null) interval.current = setInterval(() => {
      weather.update();
      setOvercast(weather.current.overcast);
      setWind(weather.current.wind);
    }, 100)
  })

  return (
    <>
      <Sky overcast={overcast} />
      <Sea layers="11" />
      <Fog overcast={overcast} />
      <Wind wind={wind} />
    </>
  );
}