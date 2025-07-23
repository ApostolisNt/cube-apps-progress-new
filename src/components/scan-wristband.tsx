import { useLocalization } from "../context/localization-context";

const ScanWristband = () => {
  const { t } = useLocalization();
  return (
    <div
      data-testid="scan-wristband"
      className="fixed bottom-24 w-full text-center text-2xl font-semibold text-cube-primary animate-pulse uppercase"
    >
      {t("scan_for_activity")}
    </div>
  );
};

export default ScanWristband;
