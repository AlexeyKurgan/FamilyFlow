import IAuthProps from "../types/AuthProps";
import {
  Box,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  TextField,
} from "@mui/material";
import Button from "../../shared/components/Button";
import {
  MdOutlineEmail,
  TbLockPassword,
  FaEye,
  FaEyeSlash,
  FaUser,
} from "../../shared/react-icons/icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthMode } from "../constants/AuthMode";

const AuthForm = ({ mode }: IAuthProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const currentMode = mode || (location.pathname.replace("/", "") as AuthMode);

  const handleClickVisiblePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <Box
      component="form"
      className="flex flex-col flex-wrap py-5 px-25 justify-center gap-8 max-sm:px-5"
    >
      {/* userName */}
      {currentMode === AuthMode.SIGN_UP && (
        <TextField
          required
          id="name"
          label="Name"
          type="text"
          sx={{
            "& label.Mui-focused": { color: "#ffb900" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffb900" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "#ffb900" },
            },
          }}
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser className="text-amber-400" size={20} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}

      {/* email */}
      <TextField
        required
        id="email"
        label="Email"
        type="email"
        sx={{
          "& label.Mui-focused": { color: "#ffb900" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ffb900" },
            "&:hover fieldset": { borderColor: "black" },
            "&.Mui-focused fieldset": { borderColor: "#ffb900" },
          },
        }}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineEmail className="text-amber-400" size={20} />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* password */}
      {(currentMode === AuthMode.LOGIN || currentMode === AuthMode.SIGN_UP) && (
        <TextField
          required
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          autoComplete="on"
          sx={{
            "& label.Mui-focused": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffb900" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "#ffb900" },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    opacity: 0,
                    pointerEvents: "none",
                    [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                      opacity: 1,
                    },
                  }}
                >
                  <TbLockPassword className="text-amber-400" size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickVisiblePassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? (
                      <FaEye className="text-amber-400" size={20} />
                    ) : (
                      <FaEyeSlash className="text-amber-400" size={20} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}

      {/* LOGIN/SIGN_UP/FORGOT_PASSWORD BUTTONS */}
      <Button className="bg-amber-400 w-56 hover:scale-[1.1]" type="submit">
        {currentMode === AuthMode.LOGIN
          ? "Login"
          : currentMode === AuthMode.SIGN_UP
          ? "Sign Up"
          : "Reset Password"}
      </Button>

      {currentMode === AuthMode.LOGIN && (
        <span className="text-center text-amber-400 font-semibold">
          Forgot Password
        </span>
      )}
    </Box>
  );
};

export default AuthForm;
