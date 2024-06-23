import "./Scene.css";
import Sea from "./Sea.jsx";
import Sky from "./Sky.jsx";
import Wind from "./Wind.jsx";

export default function Scene() {
  return (
    <>
      <Sky />
      <Sea layers="11" />
      <Wind intensity={0.2} />
    </>
  );
}