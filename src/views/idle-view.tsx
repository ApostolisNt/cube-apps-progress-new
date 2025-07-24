import { useEffect, useState } from "react";
import BraceletInput from "../components/bracelet-input";
import { useApp } from "../context/app-context";
import { isValidBraceletCode } from "../helpers/valid-bracelet-code";
import { VIEWS } from "../constants/general";
import { getTeam } from "../client/api/progress";
import CubeBackgroundVideo from "../components/cube-background-video";
import { getBackgroundVideo } from "../helpers/get-background-video";
import ScanWristband from "../components/scan-wristband";
import packageJson from "../../package.json";

const IdleView = () => {
  const { setCurrentView, setTeamName, location, setTeamData } = useApp();
  const [braceletCode, setBraceletCode] = useState("");

  const handleBraceletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 10);

    if (!isValidBraceletCode(value)) {
      setBraceletCode("");
      return;
    }

    setBraceletCode(value);
  };

  useEffect(() => {
    const validateBraceletCode = async () => {
      if (braceletCode.length === 10) {
        try {
          const teamResponse = await getTeam({
            userId: braceletCode,
          });

          if (!teamResponse.team) {
            console.warn(`No team found for bracelet code: ${braceletCode}`);
            setBraceletCode("");
            return;
          }

          if (!teamResponse.team.team_name) {
            console.warn(`Team name not found for bracelet code: ${braceletCode}`);
            setBraceletCode("");
            return;
          }

          setTeamName(teamResponse.team.team_name);
          setTeamData(teamResponse);
          setBraceletCode("");
          setCurrentView(VIEWS.PROGRESS);
        } catch (error) {
          console.error(`Error validating bracelet code: ${error}`);
          setBraceletCode("");
        }
      }
    };
    validateBraceletCode();
  }, [braceletCode, setCurrentView, setTeamName, setTeamData]);

  return (
    <>
      <CubeBackgroundVideo key={location} src={getBackgroundVideo(location)} />
      <div className="flex flex-col items-center gap-4">
        <BraceletInput braceletCode={braceletCode} handleBraceletChange={handleBraceletChange} />
      </div>
      <ScanWristband />
      <h1 className="fixed bottom-5 left-9 text-xs z-10 text-app-version">
        v{packageJson.version}
      </h1>
    </>
  );
};

export default IdleView;
