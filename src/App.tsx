import { useApp } from "./context/app-context";
import { LocalizationProvider } from "./context/localization-context";
import IdleView from "./views/idle-view";
import { VIEWS } from "./constants/general";
import HealthCheck from "./components/health-check";
import LanguageDropdown from "./components/language-dropdown";
import ProgressView from "./views/progress-view";
import { useEffect } from "react";
import { getLocation } from "./client/api/location";

export default function App() {
  const { currentView, currentLanguage, setLocation } = useApp();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getLocation();
        setLocation(location);
      } catch (error) {
        console.error(`Failed to fetch location: ${error}`);
      }
    };
    fetchLocation();
  }, [setLocation]);

  console.log(`Current view: ${currentView}`);

  return (
    <LocalizationProvider language={currentLanguage}>
      <HealthCheck />
      <LanguageDropdown />
      <div className="absolute top-0 w-screen h-screen flex justify-center">
        {currentView === VIEWS.IDLE && <IdleView />}
        {currentView === VIEWS.PROGRESS && <ProgressView />}
      </div>
    </LocalizationProvider>
  );
}
