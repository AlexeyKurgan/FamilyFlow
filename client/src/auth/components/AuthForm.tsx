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

import { useFormik } from "formik";
import Button from "../../shared/components/Button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthMode } from "../../auth/types/authMode";
import { useSelector } from "react-redux";
import { signUpUser, signInUser } from "../../store/slices/authSlice";
import { showAlert } from "../../store/slices/alertSlice";
import { useAppDispatch } from "../../shared/hooks/hooks";
import { IAuthState } from "../types/authUser";
import { supabase } from "../constants/supabaseConfig";
import { validateAuthForm } from "../../shared/utils/formValidation";
import { useTranslation } from "react-i18next";

const AuthForm = ({ mode }: IAuthMode) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const currentMode = mode || (location.pathname.replace("/", "") as AuthMode);
  const navigate = useNavigate();
  const { loading, error, email } = useSelector(
    (state: { auth: IAuthState }) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      if (currentMode === AuthMode.SIGN_UP) {
        const result = await dispatch(
          signUpUser({
            email: values.email,
            password: values.password,
            name: values.name,
            last_name: values.lastName,
          })
        );

        if (signUpUser.fulfilled.match(result)) {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (!session) {
            const signInResult = await dispatch(
              signInUser({ email: values.email, password: values.password })
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
        const result = dispatch(
          signInUser({ email: values.email, password: values.password })
        );

        if (signInUser.rejected.match(result)) {
          dispatch(
            showAlert({
              message: "Login failed: " + result.payload,
              severity: "error",
            })
          );
        }
      }
    },
    validate: (values) => validateAuthForm(values, currentMode, t),
  });

  const handleClickVisiblePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      onSubmit={formik.handleSubmit}
    >
      {/* userName */}
      {currentMode === AuthMode.SIGN_UP && (
        <TextField
          name="name"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          id="name"
          label={t("LabelInputName")}
          type="text"
          value={formik.values.name}
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
          id="last_name"
          name="lastName"
          label={t("LabelInputLastName")}
          type="text"
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          value={formik.values.lastName}
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
                  <FaUser className="text-amber-400" size={20} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}

      {/* email */}
      <TextField
        id="email"
        label={t("LabelInputEmail")}
        name="email"
        type="email"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        value={formik.values.email}
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
                <MdOutlineEmail className="text-amber-400" size={20} />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* password */}
      {(currentMode === AuthMode.LOGIN || currentMode === AuthMode.SIGN_UP) && (
        <TextField
          id="password"
          label={t("LabelInputPassword")}
          name="password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          autoComplete="on"
          value={formik.values.password}
          onChange={formik.handleChange}
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

      {currentMode === AuthMode.LOGIN && (
        <>
          <Button
            className="justify-center bg-amber-400 w-56 hover:scale-[1.1]"
            type="submit"
          >
            {t("Login")}
          </Button>

          {/* <span className="text-center text-amber-400 font-semibold">
            Forgot Password
          </span> */}
        </>
      )}
      {currentMode === AuthMode.SIGN_UP && (
        <Button
          className="justify-center bg-amber-400 w-56 hover:scale-[1.1]"
          type="submit"
        >
          {t("SignUp")}
        </Button>
      )}
      {currentMode === AuthMode.FORGOT_PASSWORD && (
        <Button
          className="justify-center bg-amber-400 w-56 hover:scale-[1.1]"
          type="submit"
        >
          {t("ResetPassword")}
        </Button>
      )}
    </Box>
  );
};

export default AuthForm;
