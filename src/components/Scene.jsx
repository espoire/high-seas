import "../Scene.css";
import Sea from "./Sea.jsx";

export default function Scene() {
  return (
    <>
      <div className="sky"></div>
      <Sea layers="10" />
    </>
  );
}