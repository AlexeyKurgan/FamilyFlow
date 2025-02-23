import { AuthMode } from "../../auth/constants/authMode";
import { IAuthFormValues, IAuthFormErrors } from "../../auth/types/authFormValidation";

export const validateAuthForm = (values: IAuthFormValues, mode: AuthMode): IAuthFormErrors => {
    const errors: IAuthFormErrors = {};
    const currentMode = mode || (location.pathname.replace("/", "") as AuthMode);

    if (currentMode === AuthMode.SIGN_UP) {
        if (!values.name) {
            errors.name = "Required";
        } else if (values.name.length < 3) {
            errors.name = "Must be at least 3 characters";
        }

        if (!values.lastName) {
            errors.lastName = "Required";
        } else if (values.lastName.length < 3) {
            errors.lastName = "Must be at least 3 characters";
        }
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 6) {
        errors.password = "Must be at least 6 characters";
    }

    return errors;
};
