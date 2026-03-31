import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PomodoroScreen } from "../screens/PomodoroScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useSettings } from "../context/SettingsContext";
import { getColors } from "../theme/colors";

export type RootStackParamList = {
    Pomodoro: undefined;
    Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    const { themeMode } = useSettings();
    const colors = getColors(themeMode);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: colors.card },
                    headerTintColor: colors.text,
                    headerTitleStyle: { color: colors.text },
                    headerShadowVisible: false
                }}
            >
                <Stack.Screen
                    name="Pomodoro"
                    component={PomodoroScreen}
                    options={{
                        title: "",
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        title: "Settings"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}