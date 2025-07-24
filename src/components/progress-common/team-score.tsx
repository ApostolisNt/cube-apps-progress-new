import { useApp } from "../../context/app-context";
import { useLocalization } from "../../context/localization-context";

const TeamScore = () => {
  const { teamData } = useApp();
  const { t } = useLocalization();

  return (
    <div className="h-24 flex flex-col items-center justify-center">
      <p className="text-3xl tracking-[-1px] text-center text-cube-primary uppercase mb-0">
        {t("score")}
      </p>
      <p className="text-[70px] tracking-[-4px] text-center text-cube-primary leading-none">
        {teamData?.team.score}
      </p>
    </div>
  );
};

export default TeamScore;
