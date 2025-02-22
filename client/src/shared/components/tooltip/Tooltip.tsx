import { IconButton, Tooltip } from "@mui/material";

import ITooltip from "../../types/tooltip";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./tooltip.module.css";

const CustomTooltip = ({
  title,
  placement,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  pathUrl,
  component = "button",
}: ITooltip) => {
  return (
    <Tooltip title={title} placement={placement}>
      <IconButton
        className={clsx(
          `${styles["base-tooltip"]} text-lg text-black cursor-pointer`,
          className
        )}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        component={component}
        {...(component === Link && pathUrl ? { to: pathUrl } : {})}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default CustomTooltip;
