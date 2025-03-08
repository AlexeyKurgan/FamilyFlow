import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  FaTasks,
  GrAchievement,
  GrResources,
  IoMdSettings,
  IoStorefront,
  MdDashboard,
  MdIntegrationInstructions,
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
} from "../../../shared/react-icons/icons";
import { useEffect } from "react";
import Button from "../../../shared/components/Button";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {}, [location.pathname]);

  const navItems = [
    { path: "/dashboard", title: t("Dashboard"), icon: <MdDashboard /> },
    { path: "/dashboard/tasks", title: t("Tasks"), icon: <FaTasks /> },
    {
      path: "/dashboard/integrations",
      title: t("Integrations"),
      icon: <MdIntegrationInstructions />,
    },
    {
      path: "/dashboard/resources",
      title: t("Resources"),
      icon: <GrResources />,
    },
    {
      path: "/dashboard/achievement",
      title: t("Achievement"),
      icon: <GrAchievement />,
    },
    {
      path: "/dashboard/rewards_shop",
      title: t("Rewards shop"),
      icon: <IoStorefront />,
    },
    {
      path: "/dashboard/settings",
      title: t("Settings"),
      icon: <IoMdSettings />,
    },
  ];

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Tooltip key={item.path} title={item.title} placement="right" arrow>
            <Link
              to={item.path}
              className={`
                ${styles.navLink} 
                ${isOpen ? "" : styles.navLinkCollapsed} 
                ${location.pathname === item.path ? styles.navLinkActive : ""}
              `}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {isOpen && <span className={styles.navText}>{item.title}</span>}
            </Link>
          </Tooltip>
        ))}
      </nav>
      <Button type="button" onClick={onToggle} className={styles.toggleButton}>
        {isOpen ? (
          <RiArrowLeftDoubleLine
            size={25}
            className="animate-scale-animation"
          />
        ) : (
          <RiArrowRightDoubleLine
            size={25}
            className="animate-scale-animation"
          />
        )}
      </Button>
    </aside>
  );
};

export default Sidebar;
