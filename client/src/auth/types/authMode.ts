import { AuthMode } from "../constants/authMode"

interface IAuthMode {
    mode: AuthMode.LOGIN | AuthMode.SIGN_UP | AuthMode.FORGOT_PASSWORD
}

export default IAuthMode