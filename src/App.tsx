import { useApp } from "./context/app-context";
import { LocalizationProvider } from "./context/localization-context";
import IdleView from "./views/idle-view";
import { VIEWS } from "./constants/general";
import HealthCheck from "./components/health-check";
import LanguageDropdown from "./components/language-dropdown";
import ProgressView from "./views/progress-view";
import { useEffect } from "react";
import { getGameMode, getLocation, getTimezone } from "./client/api/settings";
import TimeZoneCheck from "./components/timezone-check";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const {
    currentView,
    currentLanguage,
    setLocation,
    setTimezone,
    setGameMode,
  } = useApp();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getLocation();
        const timezone = await getTimezone();
        const gameMode = await getGameMode();
        setLocation(location);
        setTimezone(timezone);
        setGameMode(gameMode);
      } catch (error) {
        console.error(`Failed to fetch location: ${error}`);
      }
    };
    fetchLocation();
  }, [setLocation, setTimezone, setGameMode]);

  return (
    <LocalizationProvider language={currentLanguage}>
      <ToastContainer />
      <HealthCheck />
      <LanguageDropdown />
      <TimeZoneCheck />
      <div className="absolute top-0 w-screen h-screen flex justify-center">
        {currentView === VIEWS.IDLE && <IdleView />}
        {currentView === VIEWS.PROGRESS && <ProgressView />}
      </div>
    </LocalizationProvider>
  );
}
