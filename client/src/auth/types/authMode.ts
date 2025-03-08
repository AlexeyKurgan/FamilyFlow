export enum AuthMode {
    LOGIN = "login",
    SIGN_UP = "sign-up",
    FORGOT_PASSWORD = "forgot-password",
}


interface IAuthMode {
    mode: AuthMode.LOGIN | AuthMode.SIGN_UP | AuthMode.FORGOT_PASSWORD
}

export default IAuthMode