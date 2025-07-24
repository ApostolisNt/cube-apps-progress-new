import { useEffect, useRef } from "react";
import { useLocalization } from "../context/localization-context";
import type { BraceletInputProps } from "../types/components";

const BraceletInput = ({ braceletCode, handleBraceletChange }: BraceletInputProps) => {
  const { t } = useLocalization();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && braceletCode.length === 0) {
      inputRef.current.focus();
    }
  }, [braceletCode]);

  useEffect(() => {
    const handleGlobalClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className="group relative top-3">
      <input
        ref={inputRef}
        id="bracelet-code-input"
        name="braceletCode"
        type="text"
        placeholder={t("scan.braceletPlaceholder")}
        value={braceletCode}
        onChange={handleBraceletChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        autoComplete="off"
      />
    </div>
  );
};

export default BraceletInput;
