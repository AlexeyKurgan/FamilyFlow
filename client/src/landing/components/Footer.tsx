import { Link } from "react-router-dom";
import Logo from "../../shared/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#FDF0D0] rounded-lg shadow-lg border-2 border-amber-400 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to={"/"} className="max-sm:text-center">
            <Logo />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-amber-400 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-black sm:text-center">
          © 2023 FamilyFlow™. <br /> All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
