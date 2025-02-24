import {
  RxHamburgerMenu,
  CiLogin,
  FiUserPlus,
} from "../../shared/react-icons/icons";
import Button from "../../shared/components/Button";
import LandingNavigation from "./LandingNavigtion";
import Logo from "../../shared/components/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../shared/components/language-switcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ILanguage } from "../../store/slices/languageSlice";
import { useSelector } from "react-redux";
import clsx from "clsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { language } = useSelector(
    (state: { language: ILanguage }) => state.language
  );
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/auth");
  };
  const navigateToSignUp = () => {
    navigate("/auth/sign-up");
  };

  const handleOpenBurgerMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseBurgerMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className="flex 
                items-center 
                bg-white p-[10px] 
                border-b-2 border-amber-400 
                shadow-xl rounded-lg 
                sticky 
                top-0 
                z-1 m-0 mx-[12px]
                max-sm:mx-0 max-sm:p-3.5
                "
    >
      <Logo classNames="max-md:mr-2 max-md:hidden mr-[20px]" />
      <RxHamburgerMenu
        className="hidden max-md:block max-md:mr-auto"
        size={25}
        onClick={handleOpenBurgerMenu}
      />
      <LandingNavigation
        isMenuOpen={isMenuOpen}
        closeMenuBurger={handleCloseBurgerMenu}
      />

      <div
        className="flex justify-end wrap w-[60%] 
                      min-w-[40%] gap-2.5 max-[506px]:w-[auto]"
      >
        <LanguageSwitcher className={"mr-3 max-[506px]:mr-[0]"} />
        <Button
          type="button"
          className={clsx(
            "bg-amber-400",
            "mr-[10px]",
            "hover:scale-[1.1]",
            "box-border",
            "max-sm:max-w-28",
            "max-[506px]:mr-[0]",
            "max-[506px]:min-w-[105px]",
            {
              "max-w-[120px]": language === "en",
              "max-w-[100px]": language === "ua",
            }
          )}
          onClick={navigateToLogin}
        >
          <CiLogin size={22} />
          <span>{t("Login")}</span>
        </Button>

        <Button
          type="button"
          className={clsx(
            "bg-black",
            "text-white",
            "hover:scale-[1.1]",
            "box-border",
            "max-sm:max-w-28 ",
            "max-[506px]:mr-[0]",
            "max-[506px]:min-w-[105px]",
            {
              "max-w-[120px]": language === "en",
              "max-w-[180px]": language === "ua",
            }
          )}
          onClick={navigateToSignUp}
        >
          <FiUserPlus size={22} className="mr-2" />
          <span className="max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
            {t("SignUp")}
          </span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
