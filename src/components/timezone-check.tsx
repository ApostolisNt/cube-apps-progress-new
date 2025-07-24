import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useApp } from "../context/app-context";

const TimeZoneCheck = () => {
  const { timezone } = useApp();
  const [isStarted, setIsStarted] = useState(false);
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    const checkTime = () => {
      if (!timezone) return;

      const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log(
        `Client timezone: ${clientTimezone}, Server timezone: ${timezone}`
      );

      if (timezone !== clientTimezone) {
        if (toastIdRef.current !== null) {
          toast.dismiss(toastIdRef.current);
        }

        toastIdRef.current = toast.error(
          "The local machine timezone differs from the server timezone. Fix server timezone value or insert ENV: TIMEZONE var",
          {
            toastId: "timezone-mismatch",
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      } else {
        if (toastIdRef.current !== null) {
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
        }
      }
    };

    if (!isStarted && timezone) {
      setIsStarted(true);
      checkTime();
    }

    if (timezone) {
      const intervalId = setInterval(checkTime, 30 * 60 * 1000); // Check every 30 minutes

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timezone, isStarted]);

  return null;
};

export default TimeZoneCheck;
