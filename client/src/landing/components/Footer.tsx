import { Link } from "react-router-dom";
import Logo from "../../shared/components/Logo";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#FDF0D0] rounded-lg shadow-lg border-2 border-amber-400 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to={"/"} className="max-sm:text-center">
            <Logo />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0">
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">
                {t("About Us")}
              </Link>
            </li>
            <li>
              <Link
                to="/privacy_policy"
                className="hover:underline me-4 md:me-6"
              >
                {t("Privacy")}
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-amber-400 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-black sm:text-center">
          © 2024 FamilyFlow™. <br /> {t("AllRightsReserved")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
