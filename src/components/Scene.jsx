import "./Scene.css";
import Fog from "./Fog.jsx";
import Sea from "./Sea.jsx";
import Sky from "./Sky.jsx";
import Wind from "./Wind.jsx";
import { useEffect, useRef, useState } from "react";
import WeatherState from "./WeatherState.js";

export default function Scene() {
  const weather = useRef(new WeatherState())
  const [ overcast, setOvercast ] = useState(weather.current.active.overcast);
  const [ wind, setWind ] = useState(weather.current.active.wind);

  const interval = useRef(null);
  useEffect(() => {
    weather.current.update();

    if (interval.current == null) interval.current = setInterval(() => {
      weather.current.update();
      setOvercast(weather.current.active.overcast);
      setWind(weather.current.active.wind);
    }, 100)
  })

  return (
    <>
      <Sky overcast={overcast} />
      <Sea layers="11" wind={wind} />
      <Fog overcast={overcast} />
      <Wind wind={wind} />
    </>
  );
}