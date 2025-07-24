import { useApp } from "../../context/app-context";

const TeamName = () => {
  const { teamName } = useApp();
  return (
    <div className="flex flex-col items-center justify-center text-cube-primary">
      <p className="text-3xl uppercase">Name</p>
      <p className="text-[70px] tracking-[-7px] leading-none">{teamName?.toLowerCase()}</p>
    </div>
  );
};

export default TeamName;
