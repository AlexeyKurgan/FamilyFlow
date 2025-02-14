import { HiGlobeAlt } from "react-icons/hi";

import { RxHamburgerMenu } from "react-icons/rx";
import Button from "../../shared/components/Button";
import LandingNavigation from "./LandingNavigtion";
import Logo from "../../shared/components/Logo";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="flex items-center mr-8 cursor-pointer hover:text-amber-400 max-sm:mr-2">
        <span className="animate-spin slow-spin">
          <HiGlobeAlt size={20} />
        </span>
        <span className="ml-1">EN</span>
      </div>

      <Button className="bg-amber-400 hover:scale-[1.1] box-border max-w-[125px] mr-4 max-sm:max-w-28">
        Login
      </Button>
      <Button className="bg-black text-white max-w-[125px] box-border border-amber-400 hover:scale-[1.1] max-sm:max-w-28">
        Sign up
      </Button>
    </header>
  );
};

export default Header;
