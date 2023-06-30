import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {Pressable, Text, View} from "react-native";
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {Colors} from './constants/styles';
import AuthContextProvider, {AuthContext} from "./store/auth-context";
import {useContext} from "react";
import IconButton from "./components/ui/IconButton";

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    const authCtx = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerRight: ({ tintColor }) =>
                        <Pressable onPress={authCtx.logout}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>LogOut</Text>
                                <IconButton
                                    icon="exit"
                                    color={tintColor}
                                    size={24}
                                />
                            </View>
                        </Pressable>
                }}
            />
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useContext(AuthContext);
    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && < AuthStack/>}
            {authCtx.isAuthenticated && <AuthenticatedStack/>}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <>
            <AuthContextProvider>
                <StatusBar style="light"/>

                <Navigation/>
            </AuthContextProvider>
        </>
    );
}
