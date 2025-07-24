import { useState, useEffect, useCallback, useMemo } from "react";
import { tz } from "moment-timezone";
import { useApp } from "../../context/app-context";
import { useLocalization } from "../../context/localization-context";

const TimeLeft = () => {
  const { teamData, timezone } = useApp();
  const { t } = useLocalization();
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const endTime = useMemo(() => {
    if (!teamData?.team || !timezone) return null;

    const { timeofactivation, timetoplay, dateofplay } = teamData.team;
    if (!timeofactivation || !dateofplay) return null;

    const dateTimeString = `${dateofplay} ${timeofactivation}`;
    const dateTime = tz(dateTimeString, timezone);
    return dateTime.add(timetoplay, "hours");
  }, [teamData, timezone]);

  const calculateRemainingTime = useCallback(() => {
    if (!endTime || !timezone) {
      setRemainingSeconds(0);
      return;
    }

    const currentTime = tz(timezone);
    const diff = endTime.diff(currentTime) / 1000;
    setRemainingSeconds(Math.max(0, Math.floor(diff)));
  }, [endTime, timezone]);

  const { hours, minutes, seconds, color } = useMemo(() => {
    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;

    return {
      hours: h,
      minutes: m.toString().padStart(2, "0"),
      seconds: s.toString().padStart(2, "0"),
      color: h === 0 && m < 15 ? "#D54B4B" : "#2EFDDB",
    };
  }, [remainingSeconds]);

  const displayTime =
    remainingSeconds > 0
      ? `${hours}:${minutes}:${seconds}`
      : t("no_remaining_time");

  useEffect(() => {
    if (!endTime) return;

    calculateRemainingTime();

    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [calculateRemainingTime, endTime]);

  return (
    <div className="h-24 flex flex-col items-center justify-center">
      <p className="text-3xl tracking-[-1px] text-center text-cube-primary uppercase mb-0">
        {t("time_left")}
      </p>
      <p style={{ color }} className="text-[70px] tracking-[-4px] text-center leading-none">
        {displayTime}
      </p>
    </div>
  );
};

export default TimeLeft;
