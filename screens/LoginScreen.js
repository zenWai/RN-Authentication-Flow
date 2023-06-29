import AuthContent from '../components/Auth/AuthContent';
import {useState} from "react";
import {login} from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {Alert} from "react-native";

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        try {
            await login(email, password);
        } catch (error) {
            Alert.alert(
                'Authentication failed!',
                'Could not log you in. Please Check your credentials or try again later!'
            );
        }
        setIsAuthenticating(false);
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Loging In ..."/>;
    }
    return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
