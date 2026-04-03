import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark";

type SettingsContextValue = {
    focusDurationMinutes: number;
    themeMode: ThemeMode;
    timerAlertsEnabled: boolean;
    catImagesEnabled: boolean;
    setFocusDurationMinutes: (value: number) => void;
    setThemeMode: (value: ThemeMode) => void;
    setTimerAlertsEnabled: (value: boolean) => void;
    setCatImagesEnabled: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);
const SETTINGS_STORAGE_KEY = "pomodoro-settings";

type SettingsProviderProps = {
    children: ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
    const [focusDurationMinutes, setFocusDurationMinutes] = useState(25);
    const [themeMode, setThemeMode] = useState<ThemeMode>("light");
    const [hasLoadedSettings, setHasLoadedSettings] = useState(false);
    const [timerAlertsEnabled, setTimerAlertsEnabled] = useState(false);
    const [catImagesEnabled, setCatImagesEnabled] = useState(false);

    useEffect(() => {
        async function loadSettings() {
            try {
                const storedVaule = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);

                if (!storedVaule) { return; }

                const parsed = JSON.parse(storedVaule);

                if (typeof parsed.focusDurationMinutes === "number" && parsed.focusDurationMinutes > 0) {
                    setFocusDurationMinutes(parsed.focusDurationMinutes);
                }

                if (parsed.themeMode === "light" || parsed.themeMode === "dark") {
                    setThemeMode(parsed.themeMode);
                }

                if (typeof parsed.timerAlertsEnabled === "boolean") {
                    setTimerAlertsEnabled(parsed.timerAlertsEnabled);
                }

                if (typeof parsed.catImagesEnabled === "boolean") {
                    setCatImagesEnabled(parsed.catImagesEnabled);
                }
            } catch (error) {
                console.warn("Failed to load settings", error);
            } finally {
                setHasLoadedSettings(true);
            }
        }

        loadSettings();
    }, []);

    useEffect(() => {
        if (!hasLoadedSettings) {
            return;
        }

        async function saveSettings() {
            try {
                await AsyncStorage.setItem(
                    SETTINGS_STORAGE_KEY,
                    JSON.stringify({
                        focusDurationMinutes,
                        themeMode,
                        timerAlertsEnabled,
                        catImagesEnabled
                    })
                );
            } catch (error) {
                console.warn("Failed to save settings", error)
            }
        }

        saveSettings();
    }, [hasLoadedSettings, themeMode, focusDurationMinutes, timerAlertsEnabled, catImagesEnabled]);

    return (
        <SettingsContext.Provider
            value={{
                focusDurationMinutes,
                themeMode,
                timerAlertsEnabled,
                catImagesEnabled,
                setFocusDurationMinutes,
                setThemeMode,
                setTimerAlertsEnabled,
                setCatImagesEnabled
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error("useSettings must be used inside SettingsProvider");
    }

    return context;
}