import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { SettingsProvider } from "./src/context/SettingsContext";

export default function App() {
    return (
        <SafeAreaProvider>
            <SettingsProvider>
                <RootNavigator />
            </SettingsProvider>
        </SafeAreaProvider>
    );
}