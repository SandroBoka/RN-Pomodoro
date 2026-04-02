import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { SettingsProvider } from "./src/context/SettingsContext";
import { configureNotifications } from "./src/services/timerNotifications";
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        configureNotifications();
    }, []);

    return (
        <SafeAreaProvider>
            <SettingsProvider>
                <RootNavigator />
            </SettingsProvider>
        </SafeAreaProvider>
    );
}