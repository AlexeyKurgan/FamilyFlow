import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { MdOutlineSubtitles } from "../../../react-icons/icons";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { supabase } from "../../../../auth/constants/supabaseConfig";
import { ClipLoader } from "react-spinners";
import { fetchFamilyMembers } from "../../../../auth/api/utils/userUtils";
import { IAddTaskModalProps } from "../../../types/modal";

export interface IFormikValues {
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_to: string;
}

export interface User {
  uuid: string;
  name: string;
  last_name: string;
  avatar_url?: string;
}

const AddTaskModal = ({ onSubmit, onFormSubmit }: IAddTaskModalProps) => {
  const [familyMembers, setFamilyMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFamilyMembers = async () => {
      setLoading(true);
      try {
        const members = await fetchFamilyMembers();
        setFamilyMembers(members);
      } finally {
        setLoading(false);
      }
    };
    loadFamilyMembers();
  }, []);

  const formik = useFormik<IFormikValues>({
    initialValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      assigned_to: "",
    },
    onSubmit: async (values) => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const creator_id = user?.id;

        if (!creator_id) throw new Error("User not authenticated");
        onSubmit({ ...values, creator_id });
      } catch (error) {
        console.error("Failed to prepare task data:", error);
      }
    },
  });

  if (onFormSubmit) {
    onFormSubmit(formik.submitForm);
  }

  return (
    <Box
      component="form"
      className="flex flex-col gap-4"
      id="add-task-form"
      onSubmit={formik.handleSubmit}
    >
      <FormControl>
        <FormLabel id="title">Title</FormLabel>
        <TextField
          name="title"
          id="title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
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
                  <MdOutlineSubtitles className="text-amber-400" size={20} />
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel id="description">Description</FormLabel>
        <TextField
          name="description"
          id="description"
          multiline
          rows={7}
          placeholder="Task description"
          value={formik.values.description}
          onChange={formik.handleChange}
          variant="outlined"
          sx={{
            "& label.Mui-focused": { color: "#ffb900" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffb900" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "#ffb900" },
            },
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel id="priority">Priority</FormLabel>
        <RadioGroup
          row
          aria-labelledby="priority"
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
        >
          <FormControlLabel value="urgent" control={<Radio />} label="Urgent" />
          <FormControlLabel value="high" control={<Radio />} label="High" />
          <FormControlLabel value="medium" control={<Radio />} label="Medium" />
          <FormControlLabel value="normal" control={<Radio />} label="Normal" />
          <FormControlLabel value="low" control={<Radio />} label="Low" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="status">Status</FormLabel>
        <RadioGroup
          row
          aria-labelledby="status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
        >
          <FormControlLabel
            value="in_progress"
            control={<Radio />}
            label="In Progress"
          />
          <FormControlLabel
            value="pending"
            control={<Radio />}
            label="Pending"
          />
          <FormControlLabel
            value="complete"
            control={<Radio />}
            label="Complete"
          />
        </RadioGroup>
      </FormControl>

      <FormControl
        sx={{
          "& label.Mui-focused": { color: "#ffb900" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ffb900" },
            "&:hover fieldset": { borderColor: "black" },
            "&.Mui-focused fieldset": { borderColor: "#ffb900" },
          },
        }}
      >
        <InputLabel id="assigned_user">Assign User</InputLabel>
        <Select
          labelId="assigned_user"
          id="assigned_user"
          name="assigned_to"
          value={formik.values.assigned_to}
          onChange={(event) =>
            formik.setFieldValue("assigned_to", event.target.value)
          }
          input={<OutlinedInput label="Assign User" />}
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
          renderValue={(selected) => {
            const selectedUser = familyMembers.find(
              (user) => user.uuid === selected
            );
            return selectedUser
              ? `${selectedUser.name} ${selectedUser.last_name}`
              : "";
          }}
        >
          {loading ? (
            <ClipLoader
              className="absolute right-[39%] top-1/2 transform translate-x-[-50%] translate-y-[-50%]"
              color="#FABB18"
              size={50}
            />
          ) : (
            familyMembers.map((user) => (
              <MenuItem key={user.uuid} value={user.uuid}>
                <ListItemText primary={`${user.name} ${user.last_name}`} />
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default AddTaskModal;
