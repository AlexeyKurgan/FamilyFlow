import { AuthMode } from "../constants/AuthMode"

interface IAuthProps {
    mode: AuthMode.LOGIN | AuthMode.SIGN_UP | AuthMode.FORGOT_PASSWORD
}

export default IAuthProps