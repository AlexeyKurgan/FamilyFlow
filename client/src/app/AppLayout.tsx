import { useState } from "react";
import { Main, Container } from "../shared/components/Container";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.appLayout}>
      <Header
        onAvatarClick={handleAvatarClick}
        onMenuClose={handleMenuClose}
        anchorEl={anchorEl}
      />{" "}
      <div className={styles.mainContent}>
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <Main className={styles.mainAppWrapper}>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </div>
    </div>
  );
};

export default AppLayout;
