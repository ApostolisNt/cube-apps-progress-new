import { useEffect } from "react";
import { useApp } from "../context/app-context";
import { roomsListsToShow } from "../helpers/get-room-list";
import TeamName from "../components/progress-common/team-name";
import TimeLeft from "../components/progress-common/time-left";
import TeamScore from "../components/progress-common/team-score";
import RoomsList from "../components/progress-common/rooms-list";
import PhotoGrid from "../components/progress-common/photo-grid";
import Logo from "../components/progress-common/logo";

const ProgressView = () => {
  const { teamData, resetToIdle } = useApp();
  const finalRooms = roomsListsToShow(teamData?.rooms);

  console.log("ProgressView rendered with teamData:", teamData);
  console.log("Final rooms to display:", finalRooms);

  useEffect(() => {
    const interval = setInterval(() => {
      resetToIdle();
    }, 5000);

    return () => clearInterval(interval);
  }, [resetToIdle]);

  return (
    <div
      className="flex flex-col items-center justify-start h-screen py-[3vh] text-[#2efddb]"
      data-testid="show-team-data"
    >
      <Logo />

      <div className="w-[880px] border-2 border-[#2efddb] rounded-[7px] flex flex-col justify-center items-center mb-8 py-10 gap-8">
        <div className="w-full h-[100px] flex justify-evenly items-start">
          <TeamName />
          <TimeLeft />
          <TeamScore />
        </div>
        <PhotoGrid />
      </div>

      {finalRooms.length > 0 && (
        <div
          className="relative w-[880px] border-2 border-[#2efddb] rounded-[7px] flex justify-evenly flex-wrap"
          data-testid="rooms-list-wrapper"
        >
          <RoomsList />
        </div>
      )}
    </div>
  );
};

export default ProgressView;
