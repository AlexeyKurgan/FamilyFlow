import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Button from "../../../../shared/components/Button";

const TaskFilters = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get("statusFilter") || "all"
  );
  const [priorityFilter, setPriorityFilter] = useState<string>(
    searchParams.get("priorityFilter") || "all"
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === "inputSearchValue") {
      setSearchValue(value);
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("search", value);
        return newParams;
      });
    }
  };

  const handleSelectsChange = (event: SelectChangeEvent<string>) => {
    const { value, name } = event.target;

    if (name === "statusFilter") {
      setStatusFilter(value);
    } else if (name === "priorityFilter") {
      setPriorityFilter(value);
    }

    setSearchParams((prevParams) => {
      const newUrlSearchParams = new URLSearchParams(prevParams);

      if (name === "statusFilter") {
        newUrlSearchParams.set("statusFilter", value);
      } else if (name === "priorityFilter") {
        newUrlSearchParams.set("priorityFilter", value);
      }

      return newUrlSearchParams;
    });
  };

  function onResetFilters(): void {
    setSearchValue("");
    setSearchParams("");
    setStatusFilter("all");
    setStatusFilter("all");
  }

  return (
    <div className="flex gap-4 mb-4">
      <TextField
        className="w-full max-w-[450px]"
        name="inputSearchValue"
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
      />
      <Box className="flex w-full gap-3.5  max-w-[450px]">
        <FormControl
          fullWidth
          sx={{
            "& label.Mui-focused": { color: "#ffb900" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffb900" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "#ffb900" },
            },
          }}
        >
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="statusFilter"
            value={statusFilter}
            label="Status"
            name="statusFilter"
            onChange={(e) => handleSelectsChange(e)}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "white",
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#ffb900",
                    color: "black",
                  },
                },
              },
            }}
          >
            <MenuItem value={"all"}>All Statuses</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"complete"}>Completed</MenuItem>
            <MenuItem value={"in_progress"}>In Progress</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          sx={{
            "& label.Mui-focused": { color: "#ffb900" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffb900" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "#ffb900" },
            },
          }}
        >
          <InputLabel id="priority-filter-label">Priority</InputLabel>
          <Select
            labelId="priority-filter-label"
            id="priorityFilter"
            value={priorityFilter}
            label="Priority"
            name="priorityFilter"
            onChange={(e) => handleSelectsChange(e)}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "white",
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#ffb900",
                    color: "black",
                  },
                },
              },
            }}
          >
            <MenuItem value={"all"}>All Priorities</MenuItem>
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
            <MenuItem value={"urgent"}>Urgent</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        type="button"
        onClick={onResetFilters}
        className="bg-amber-400 justify-center max-w-[150px] ml-[auto]"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default TaskFilters;
