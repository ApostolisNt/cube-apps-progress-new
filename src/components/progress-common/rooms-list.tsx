import type { Rooms } from "../../helpers/get-room-list";
import { getRoomVariation } from "../../helpers/get-room-variation";
import Room from "./room";

type RoomListProps = {
  rooms: Rooms;
};

const RoomsList = ({ rooms }: RoomListProps) => {
  // const { location } = useAppContext();

  return (
    <div className="w-full flex flex-wrap justify-around p-5">
      {rooms?.map((room) => {
        const { colorClass, animationClass } = getRoomVariation(room.room_name);

        return (
          <Room
            key={room.room_name}
            color={colorClass}
            name={room.room_name}
            // customName={customRoomNames[room.room_name]}
            tries={room.tries}
            score={room.score}
            difficulty={room.difficulty}
            animation={animationClass}
          />
        );
      })}
    </div>
  );
};

export default RoomsList;
