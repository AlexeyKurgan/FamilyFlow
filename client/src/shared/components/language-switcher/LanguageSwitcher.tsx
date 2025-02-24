import { useSelector } from "react-redux";
import { changeLanguage, ILanguage } from "../../../store/slices/languageSlice";
import { HiGlobeAlt } from "../../react-icons/icons";
import { useAppDispatch } from "../../hooks/hooks";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const LanguageSwitcher = ({ className }: { className: string }) => {
  const { i18n } = useTranslation();
  const { language } = useSelector(
    (state: { language: ILanguage }) => state.language
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <>
      <div
        className={`flex items-center relative cursor-pointer hover:text-amber-400 ${className}`}
        onClick={() =>
          dispatch(changeLanguage(language === "en" ? "ua" : "en"))
        }
      >
        <span className="animate-spin slow-spin">
          <HiGlobeAlt size={20} />
        </span>
        <span className="ml-1">{language.toLocaleUpperCase()}</span>
      </div>
    </>
  );
};

export default LanguageSwitcher;
