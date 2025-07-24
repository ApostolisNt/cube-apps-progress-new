import { useLocalization } from "../../context/localization-context";
import { replaceUnderscoreWithSpace } from "../../helpers/general";
import type { RoomProps } from "../../types";
import { RoomsLogo } from "../../utils/rooms-logo";

const Room = ({ color, name, tries, score, difficulty, customName, animation }: RoomProps) => {
  const { t } = useLocalization();
  return (
    <div className={`relative w-[48%] h-[75px] rounded-lg m-1.5 border-2 ${animation} ${color}`}>
      <div className="absolute top-0.5 right-4 w-3xs h-4 text-base text-right font-goth-medium">
        {replaceUnderscoreWithSpace(customName ? customName : name)}
      </div>

      <div className="h-full w-full relative">
        <img
          src={RoomsLogo[name as keyof typeof RoomsLogo]}
          alt=""
          className="absolute left-4 top-3 w-12 h-12"
        />

        <div className="absolute left-20 top-2.5 w-max text-left tracking-wide">
          <p>{t("room_points")}:</p>
          <p className="text-5xl tracking-tighter leading-7">{score}</p>
        </div>

        <div className="absolute left-58 top-8 w-max text-left tracking-wide">
          <p className="text-xs">{t("room_level")}:</p>
          <p className="text-2xl tracking-wide leading-4 text-center">{difficulty}</p>
        </div>

        <div className="absolute right-4 top-8 w-max text-left tracking-wide">
          <p className="text-xs">{t("room_tries")}:</p>
          <p className="text-2xl tracking-tighter leading-4 text-center">{tries}</p>
        </div>
      </div>
    </div>
  );
};

export default Room;
