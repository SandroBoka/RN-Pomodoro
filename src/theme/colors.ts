export type AppColors = {
    background: string;
    card: string;
    text: string;
    mutedText: string;
    accent: string;
    secondarySurface: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    icon: string;
    inputBackground: string;
    border: string;
};

export function getColors(themeMode: "light" | "dark"): AppColors {
    if (themeMode === "dark") {
        return {
            background: "#16181D",
            card: "#23262F",
            text: "#F5F7FA",
            mutedText: "#A9B0BC",
            accent: "#FF6B6B",
            secondarySurface: "#4f535b",
            primaryButtonText: "#FFFFFF",
            secondaryButtonText: "#F5F7FA",
            icon: "#F5F7FA",
            inputBackground: "#2A2E38",
            border: "#3A404D"
        };
    } else {
        return {
            background: "#FFF8F0",
            card: "#FFFFFF",
            text: "#2D1E2F",
            mutedText: "#7A5C61",
            accent: "#B23A48",
            secondarySurface: "#EFE6DD",
            primaryButtonText: "#FFFFFF",
            secondaryButtonText: "#2D1E2F",
            icon: "#111111",
            inputBackground: "#FFFFFF",
            border: "#E4D8CC"
        };
    }
}
