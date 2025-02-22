import { AlertColor } from "@mui/material"

interface IAlert {
    message: string | null,
    show?: boolean,
    severity: AlertColor,
    title?: string,
}

export default IAlert