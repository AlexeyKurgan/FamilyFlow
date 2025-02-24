import clsx from "clsx";
import { useEffect, useRef } from "react";
import { links } from "../constants/links";
import { NavLink } from "react-router-dom";
import { FaRegWindowClose } from "../../shared/react-icons/icons";
import Logo from "../../shared/components/Logo";
import { t } from "i18next";

interface ILandingNavigationProps {
  isMenuOpen: boolean;
  closeMenuBurger: () => void;
}

const MobileLandingNavigation = ({
  isMenuOpen,
  closeMenuBurger,
}: ILandingNavigationProps) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <div
      className={clsx("absolute pt-18 left-0 top-0 w-full bg-white z-1 h-dvh", {
        invisible: isFirstRender.current,
        "animate-back-from-left": isMenuOpen,
        "animate-back-to-left": !isMenuOpen,
      })}
    >
      <ul className=" h-full">
        {links.map(({ text, url }) => (
          <li className="" key={url}>
            <NavLink
              to={url}
              className={({ isActive }) =>
                clsx(
                  "font-semibold block border-b-2 w-full h-full p-5 uppercase  hover:bg-amber-400 transition duration-300  ease-linear",
                  { "bg-amber-400": isActive }
                )
              }
              onClick={closeMenuBurger}
            >
              {t(text)}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="absolute top-5 right-10">
        <FaRegWindowClose size={24} onClick={closeMenuBurger} />
      </div>
      <div className="absolute top-2 left-2">
        <Logo />
      </div>
    </div>
  );
};

export default MobileLandingNavigation;
