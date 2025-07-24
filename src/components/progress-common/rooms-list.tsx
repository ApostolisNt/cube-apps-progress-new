import { useEffect, useState } from "react";
import { getCustomRoomNames } from "../../client/api/settings";
import type { RoomListProps } from "../../types";
import { getRoomVariation } from "../../helpers/get-room-variation";
import Room from "./room";
import { useApp } from "../../context/app-context";

const RoomsList = ({ rooms }: RoomListProps) => {
  const { location } = useApp();
  const [customRoomNames, setCustomRoomNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCustomRoomNames = async () => {
      try {
        const response: string = await getCustomRoomNames(location);

        const arr: Array<{
          room_name: string;
          custom_name: string;
        }> = JSON.parse(response);

        if (!Array.isArray(arr) || arr.length === 0) return;

        const namesByRoom: Record<string, string> = Object.fromEntries(
          arr.map(({ room_name, custom_name }) => [room_name, custom_name])
        );

        setCustomRoomNames(namesByRoom);
      } catch (error) {
        console.error("Failed to fetch custom room names:", error);
      }
    };

    fetchCustomRoomNames();
  }, [location]);

  return (
    <div className="w-full flex flex-wrap justify-around p-5">
      {rooms?.map((room) => {
        const { colorClass, animationClass } = getRoomVariation(room.room_name);

        return (
          <Room
            key={room.room_name}
            color={colorClass}
            name={room.room_name}
            customName={customRoomNames[room.room_name]}
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
