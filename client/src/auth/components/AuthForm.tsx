import IAuthMode from "../types/authMode";
import {
  Box,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  TextField,
} from "@mui/material";

import {
  MdOutlineEmail,
  TbLockPassword,
  FaEye,
  FaEyeSlash,
  FaUser,
} from "../../shared/react-icons/icons";

import Button from "../../shared/components/Button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthMode } from "../constants/authMode";
import { useSelector } from "react-redux";
import { signUpUser, signInUser } from "../../store/slices/authSlice";
import { showAlert } from "../../store/slices/alertSlice";
import { useAppDispatch } from "../../shared/hooks/hooks";
import { IAuthState } from "../types/authUser";
import { supabase } from "../constants/supabaseConfig";

const AuthForm = ({ mode }: IAuthMode) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formName, setFormName] = useState("");
  const [formLastName, setFormLastName] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { loading, error, email } = useSelector(
    (state: { auth: IAuthState }) => state.auth
  );

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMode === AuthMode.SIGN_UP) {
      const result = await dispatch(
        signUpUser({
          email: formEmail,
          password: formPassword,
          name: formName,
          last_name: formLastName,
        })
      );

      if (signUpUser.fulfilled.match(result)) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          const signInResult = await dispatch(
            signInUser({ email: formEmail, password: formPassword })
          );

          if (signInUser.rejected.match(signInResult)) {
            dispatch(
              showAlert({
                message: "Login failed after signup",
                severity: "error",
              })
            );
          }
        }
      }
    }

    if (currentMode === AuthMode.LOGIN) {
      dispatch(signInUser({ email: formEmail, password: formPassword }));
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(showAlert({ message: error, severity: "error" }));
    }

    if (!loading && !error && email) {
      dispatch(
        showAlert({
          message: "Registration was successful",
          severity: "success",
        })
      );

      const redirectTimeout = setTimeout(() => {
        navigate("/dashboard");
      }, 500);

      return () => {
        clearTimeout(redirectTimeout);
      };
    }
  }, [loading, error, email, dispatch, navigate]);

  return (
    <Box
      component="form"
      className="flex flex-col flex-wrap py-5 px-25 justify-center gap-8 max-sm:px-5"
      onSubmit={handleSubmit}
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
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
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

      {/* userLastName */}
      {currentMode === AuthMode.SIGN_UP && (
        <TextField
          required
          id="last_name"
          label="LastName"
          type="text"
          sx={{
            "& label.Mui-focused": { color: "#ffb900" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffb900" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "#ffb900" },
            },
          }}
          value={formLastName}
          onChange={(e) => setFormLastName(e.target.value)}
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
        value={formEmail}
        onChange={(e) => setFormEmail(e.target.value)}
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
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
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

      {currentMode === AuthMode.LOGIN && (
        <>
          <Button className="bg-amber-400 w-56 hover:scale-[1.1]" type="submit">
            Login
          </Button>

          <span className="text-center text-amber-400 font-semibold">
            Forgot Password
          </span>
        </>
      )}
      {currentMode === AuthMode.SIGN_UP && (
        <Button className="bg-amber-400 w-56 hover:scale-[1.1]" type="submit">
          Sign Up
        </Button>
      )}
      {currentMode === AuthMode.FORGOT_PASSWORD && (
        <Button className="bg-amber-400 w-56 hover:scale-[1.1]" type="submit">
          Reset Password
        </Button>
      )}
    </Box>
  );
};

export default AuthForm;
