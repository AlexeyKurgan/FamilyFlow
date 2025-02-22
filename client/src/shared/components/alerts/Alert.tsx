import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { createPortal } from "react-dom";
import IAlert from "../../types/alert";
import { hideAlert } from "../../../store/slices/alertSlice";
import { useAppDispatch } from "../../hooks/hooks";

const AlertMUI = ({ message, severity, show }: IAlert) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {createPortal(
        <Snackbar
          open={show}
          autoHideDuration={6000}
          onClose={() => dispatch(hideAlert())}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={() => dispatch(hideAlert())}
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>,
        document.body
      )}
    </>
  );
};

export default AlertMUI;
