import { useState, useRef, useEffect } from "react";
import globeTopSvg from "../assets/images/globe-top.svg";
import globeBottomSvg from "../assets/images/globe-bottom.svg";
import { getDefaultLanguage, getLanguages } from "../client/api/languages";
import { useApp } from "../context/app-context";
import { getFlag, type LanguageCode } from "../constants/languages";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState<LanguageCode[]>(["fallback"]);
  const { currentLanguage, setCurrentLanguage } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, {
      signal: controller.signal,
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const [languagesResponse, defaultLanguage] = await Promise.all([
          getLanguages(),
          getDefaultLanguage(),
        ]);

        const languagesList: LanguageCode[] = JSON.parse(languagesResponse);

        setLanguages(languagesList);

        if (!languagesList.includes(defaultLanguage)) {
          console.warn(
            `Default language ${defaultLanguage} not found in available languages.`
          );
        }

        const selectedLang = languagesList.includes(defaultLanguage)
          ? defaultLanguage
          : languagesList[0];

        setCurrentLanguage(selectedLang);
        console.info(`Language set to: ${selectedLang}`);
      } catch (error) {
        console.error(`Failed to fetch languages: ${error}`);
      }
    };
    fetchLanguages();
  }, [setCurrentLanguage]);

  const handleLanguageSelect = (language: LanguageCode) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    console.info(`Language changed to: ${language}`);
  };
  const expandedHeight = languages.length * 42;
  const totalHeight = isOpen ? 20 + expandedHeight + 20 : 40;

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer transition-all duration-500 ease-in-out p-0 border-0 bg-transparent"
        style={{
          height: `${totalHeight}px`,
          width: "40px",
        }}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Globe Top Half */}
        <div className="absolute top-0 left-0 w-10 h-5 z-20 overflow-hidden">
          <img
            src={globeBottomSvg}
            alt="globe top half"
            className="w-full h-10 object-cover translate-y-0"
          />
        </div>
        {/* Languages */}
        <div
          className="absolute left-0 w-10 overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            top: "20px",
            height: isOpen ? `${expandedHeight}px` : "0px",
          }}
        >
          <div className="flex flex-col items-center py-1">
            {languages.map((language, index) => (
              <div
                key={language}
                role="dialog"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageSelect(language);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLanguageSelect(language);
                  }
                }}
                className="w-8 h-8 flex items-center justify-center my-1 cursor-pointer"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                  transitionDelay: isOpen ? `${index * 30}ms` : "0ms",
                }}
                aria-label={`Select ${language} language`}
              >
                <div
                  className={`size-7 overflow-hidden rounded-sm shadow-sm  ${
                    currentLanguage === language
                      ? "opacity-100"
                      : "opacity-40 hover:opacity-90"
                  }`}
                >
                  <img
                    src={getFlag(language)}
                    alt={`${language} flag`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = getFlag("fallback");
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Globe Bottom Half */}
        <div
          className="absolute left-0 w-10 h-5 z-20 overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            top: isOpen ? `${20 + expandedHeight}px` : "20px",
          }}
        >
          <img
            src={globeTopSvg}
            alt="globe bottom half"
            className="w-full h-10 object-cover -translate-y-[20px]"
          />
        </div>
      </button>
    </div>
  );
};

export default LanguageDropdown;
