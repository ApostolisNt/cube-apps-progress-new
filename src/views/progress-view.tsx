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
  const rooms = roomsListsToShow(teamData?.rooms);

  useEffect(() => {
    const interval = setInterval(() => {
      resetToIdle();
    }, 2000000);

    return () => clearInterval(interval);
  }, [resetToIdle]);

  return (
    <div
      className="flex flex-col items-center justify-start h-screen py-[3vh] text-cube-primary"
      data-testid="show-team-data"
    >
      <Logo />

      <div className="w-[880px] border-2 border-cube-primary rounded-[7px] flex flex-col justify-center items-center mb-8 py-10 gap-8">
        <div className="w-full h-24 flex justify-evenly items-center">
          <TeamName />
          <TimeLeft />
          <TeamScore />
        </div>
        <PhotoGrid />
      </div>

      {rooms.length > 0 && (
        <div
          className="relative w-[880px] border-2 border-cube-primary rounded-[7px] flex justify-evenly flex-wrap"
          data-testid="rooms-list-wrapper"
        >
          <RoomsList rooms={rooms} />
        </div>
      )}
    </div>
  );
};

export default ProgressView;
