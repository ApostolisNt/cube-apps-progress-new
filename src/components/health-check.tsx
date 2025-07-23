import { useEffect, useState } from "react";
import { health } from "../client/api/health";

const HealthCheck = () => {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    health().then((res) => setOnline(!!res.version));

    const interval = setInterval(() => {
      health().then((res) => {
        setOnline(!!res.version);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`fixed top-4 left-4 size-3 rounded-full animate-pulse z-10 ${
        online ? "bg-success/70" : "bg-error/70"
      }`}
    />
  );
};

export default HealthCheck;
