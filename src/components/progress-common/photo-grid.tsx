import { useApp } from "../../context/app-context";
import UserPicture from "./user-picture";

const PhotoGrid = () => {
  const { teamData, gameMode } = useApp();

  const team =
    gameMode === "arena" ? teamData?.users.slice(0, 1) : teamData?.users;

  return (
    <div className="flex content-center h-24">
      {team?.map((user) => (
        <UserPicture key={user.id} picture={user.picture} />
      ))}
    </div>
  );
};

export default PhotoGrid;
