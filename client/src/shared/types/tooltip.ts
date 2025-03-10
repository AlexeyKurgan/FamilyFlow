import { TooltipProps } from "@mui/material";
import { ReactElement, ReactNode, MouseEvent, ElementType } from "react"
import { To } from "react-router-dom";

interface ITooltip {
    className?: string,
    pathUrl?: To,
    component?: ElementType,
    icon?: ReactElement,
    placement: TooltipProps["placement"]
    title: string,
    children: ReactNode,
    disableRipple?: boolean,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    onMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
    onMouseLeave?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default ITooltip;