import { AuthMode } from "../../auth/types/authMode";
import { IAuthFormValues, IAuthFormErrors } from "../../auth/types/authFormValidation";

export const validateAuthForm = (values: IAuthFormValues, mode: AuthMode, t: (key: string) => string): IAuthFormErrors => {

    const errors = {} as IAuthFormErrors;
    const currentMode = mode || (location.pathname.replace("/", "") as AuthMode);

    if (currentMode === AuthMode.SIGN_UP) {
        if (!values.name) {
            errors.name = t("Required");
        } else if (values.name.length < 3) {
            errors.name = t("MinLength3");
        }

        if (!values.lastName) {
            errors.lastName = t("Required");
        } else if (values.lastName.length < 3) {
            errors.lastName = t("MinLength3");
        }
    }

    if (!values.email) {
        errors.email = t("Required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = t("InvalidEmail");
    }

    if (!values.password) {
        errors.password = t("Required");
    } else if (values.password.length < 6) {
        errors.password = t("MinLength6");
    }

    return errors;
};
