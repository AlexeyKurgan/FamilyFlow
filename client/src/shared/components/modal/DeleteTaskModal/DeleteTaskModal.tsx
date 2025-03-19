import { Box, Typography } from "@mui/material";
import { IDeleteTaskModalProps } from "../../../types/modal";

const DeleteTaskModal = ({ taskId }: IDeleteTaskModalProps) => {
  return (
    <Box className="flex flex-col gap-4 p-4">
      <Typography variant="h6">
        Are you sure you want to delete task #{taskId}?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        This action cannot be undone.
      </Typography>
    </Box>
  );
};

export default DeleteTaskModal;
