import "./Scene.css";
import Sea from "./Sea.jsx";
import Sky from "./Sky.jsx";

export default function Scene() {
  return (
    <>
      <Sky />
      <Sea layers="11" />
    </>
  );
}