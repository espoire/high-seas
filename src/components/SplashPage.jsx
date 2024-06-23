import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

export default function SplashPage() {
  return (
    <div className="splashModal">
      <p>
      <a href="https://github.com/espoire">
        <img src="https://avatars.githubusercontent.com/u/16272456?s=40&v=4" alt="@espoire" size="20" height="20" width="20" className="circle" />
        @espoire
      </a> presents:
      </p>
      <h1>High Seas</h1>
      <p>A programmatic art piece made with</p>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Vite + React</h2>
    </div>
  );
}