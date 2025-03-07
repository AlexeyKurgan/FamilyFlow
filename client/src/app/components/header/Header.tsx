// import React, { ChangeEvent, useState } from "react";
// import React, { useState } from "react";
import {
  Avatar,
  // InputAdornment,
  Menu,
  MenuItem,
  // TextField,
  Typography,
} from "@mui/material";
import styles from "./Header.module.scss";
import Logo from "../../../shared/components/Logo";
import LanguageSwitcher from "../../../shared/components/language-switcher/LanguageSwitcher";
// import { HiMoon, HiSun } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { t } from "i18next";
// import Button from "../../../shared/components/Button";
import { useAppDispatch } from "../../../shared/hooks/hooks";
import { signOutUser } from "../../../store/slices/authSlice";
import { showAlert } from "../../../store/slices/alertSlice";
// import { FaSearch } from "../../../shared/react-icons/icons";

interface HeaderProps {
  onAvatarClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  anchorEl: null | HTMLElement;
}

const Header = ({ onAvatarClick, onMenuClose, anchorEl }: HeaderProps) => {
  // const [darkMode, setDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  // const [searchValue, setSearchValue] = useState("");

  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  //   document.body.classList.toggle("dark-mode", !darkMode);
  // };

  const handleLogout = async () => {
    try {
      await dispatch(signOutUser());
      dispatch(
        showAlert({ message: `Signed out successfully`, severity: "success" })
      );
      navigation("/");
    } catch (error) {
      dispatch(
        showAlert({ message: `Sign out failed: ${error}`, severity: "error" })
      );
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Logo classNames={styles.logo} />
      </div>
      <div className={styles.headerRight}>
        {/* <TextField
          name="search"
          id="search"
          label={t("SearchLabelInput")}
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{
            "& label.Mui-focused": { color: "#ffb900" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffb900" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "#ffb900" },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch className="text-amber-400" size={20} />
                </InputAdornment>
              ),
            },
          }}
        /> */}
        <LanguageSwitcher className={styles.languageSwitcher} />
        {/* <Button
          type="button"
          onClick={toggleTheme}
          className={`${styles.themeToggle}`}
        >
          {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
        </Button> */}

        <Avatar
          alt="User"
          src="/path/to/avatar.jpg"
          onClick={onAvatarClick}
          className={styles.avatar}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className={styles.menuProfile}>
            <Avatar
              alt={`Alex Kurhan`}
              src="/path/to/avatar.jpg"
              className={styles.menuAvatar}
            />
            <div>
              <Typography variant="body1">{`Alex Kurhan`}</Typography>
              <Typography variant="body2" color="text.secondary">
                akurhan880@gmail.com
              </Typography>
            </div>
          </div>
          <MenuItem
            className="item-menu"
            component={Link}
            to="/dashboard/profile"
          >
            {t("Profile")}
          </MenuItem>
          <MenuItem
            className="item-menu"
            component={Link}
            to="/dashboard/settings"
          >
            {t("Settings")}
          </MenuItem>
          <MenuItem className="item-menu" onClick={handleLogout}>
            {t("Logout")}
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
