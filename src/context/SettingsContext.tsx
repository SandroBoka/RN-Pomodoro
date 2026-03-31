import { createContext, useContext, useState, ReactNode } from "react";

type ThemeMode = "light" | "dark";

type SettingsContextValue = {
    focusDurationMinutes: number;
    themeMode: ThemeMode;
    setFocusDurationMinutes: (value: number) => void;
    setThemeMode: (value: ThemeMode) => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

type SettingsProviderProps = {
    children: ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
    const [focusDurationMinutes, setFocusDurationMinutes] = useState(25);
    const [themeMode, setThemeMode] = useState<ThemeMode>("light");

    return (
        <SettingsContext.Provider
            value={{
                focusDurationMinutes,
                themeMode,
                setFocusDurationMinutes,
                setThemeMode
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