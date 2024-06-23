import "./App.css";
import FrameworkTag from "./components/FrameworkTag.jsx";
import Scene from "./components/Scene.jsx";
import SplashPage from "./components/SplashPage.jsx";

export default function App() {
  return (
    <>
      <Scene />
      <FrameworkTag />
      <SplashPage />
    </>
  );
}