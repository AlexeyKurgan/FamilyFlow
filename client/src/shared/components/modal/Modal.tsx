import { ComponentType } from "react";
// import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import IModal from "../../types/modal";
import { useAppDispatch } from "../../hooks/hooks";
import { hideModal } from "../../../store/slices/modalSlice";
import { FaRegWindowClose } from "../../react-icons/icons";
import Button from "../Button";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface ICustomModalProps<T> extends IModal {
  componentRender?: ComponentType<T>;
  componentProps?: T;
  submitText?: string;
  cancelText?: string;
  onSubmit?: () => void;
}

const CustomModal = <T,>({
  componentRender: Component,
  componentProps,
  submitText = "Save",
  cancelText = "Cancel",
  className,
  show,
  title,
  onSubmit,
}: ICustomModalProps<T>) => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={show}
      className={className}
    >
      <DialogTitle className="dialog-title" id="customized-dialog-title">
        <span className="text-[1.5em] font-bold">{title}</span>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <FaRegWindowClose className="text-amber-400" />
      </IconButton>
      <DialogContent className="dialog-content" dividers>
        {Component && componentProps ? (
          <Component {...componentProps} />
        ) : (
          "No content provided"
        )}
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button
          className="text-lg 
                font-bold bg-amber-400 
                justify-center
                hover:scale-[1.1] max-w-[90px]"
          type="button"
          onClick={handleClose}
        >
          {cancelText}
        </Button>
        <Button
          className="text-lg 
                font-bold bg-black
                text-amber-400
                justify-center 
                hover:scale-[1.1] max-w-[90px]"
          type="button"
          onClick={handleSubmit}
        >
          {submitText}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CustomModal;
