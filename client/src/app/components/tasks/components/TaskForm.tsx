import { Box } from "@mui/material";
import Table from "../../Table/Table";
import TaskFilters from "./TaskFilters";

const TaskForm = () => {
  return (
    <Box component="form">
      <TaskFilters />
      <Table />
    </Box>
  );
};

export default TaskForm;
