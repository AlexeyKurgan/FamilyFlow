// Constants
import { links } from "../constants/links";

// Libs
import clsx from "clsx";

//Components
import { NavLink } from "react-router-dom";
import MobileLandingNavigation from "./MobileLandingNavigation";
import { t } from "i18next";

interface ILandingNavigationProps {
  isMenuOpen: boolean;
  closeMenuBurger: () => void;
}

const LandingNavigation = ({
  isMenuOpen,
  closeMenuBurger,
}: ILandingNavigationProps) => {
  return (
    <>
      <nav className="flex w-full max-md:hidden">
        {links.map(({ text, url }) => (
          <NavLink
            key={url}
            to={url}
            className={({ isActive }) =>
              clsx(
                "font-semibold uppercase mr-1.5 rounded-lg hover:bg-amber-400 transition duration-300 px-2.5 py-1.5 ease-linear",
                { "bg-amber-400": isActive }
              )
            }
          >
            {t(text)}
          </NavLink>
        ))}
      </nav>

      {/* Mobile navigation */}
      <MobileLandingNavigation
        closeMenuBurger={closeMenuBurger}
        isMenuOpen={isMenuOpen}
      />
    </>
  );
};

export default LandingNavigation;
